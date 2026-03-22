'use client'

import { requestRefreshAccessToken } from '@/src/apis/request/requestRefreshAccessToken'
import { linkKeys } from '@/src/apis/query/link/linkKeys'
import { myPageKeys } from '@/src/apis/query/mypage/mypageKeys'
import { referenceKeys } from '@/src/apis/query/reference/referenceKeys'
import { requestGetLinkCard } from '@/src/apis/request/requestGetLinkCard'
import {
  requestGetLinkList,
  RequestGetLinkListResponse,
} from '@/src/apis/request/requestGetLinkList'
import { useAuthStore } from '@/src/store/authStore'
import { usePendingLinkStore } from '@/src/store/pendingLinkStore'
import { LinkItem } from '@/src/types/link/link'
import { showErrorToast } from '@/src/utils/toast'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

interface LinkSseEventData {
  userLinkId?: number
  linkId?: number
  title?: string
  status?: string
  reason?: string
}

interface ParsedSseEvent {
  event: string
  data: string
}

const LINK_SYNC_RETRY_COUNT = 8
const LINK_SYNC_RETRY_DELAY_MS = 1000
const LINK_SSE_RECONNECT_DELAY_MS = 1500
const LINK_SSE_ERROR_RECONNECT_DELAY_MS = 3000
const MAX_PENDING_LINK_AGE_MS = 2 * 60 * 1000
const isDevelopment = process.env.NODE_ENV === 'development'

function parseSseChunk(chunk: string): ParsedSseEvent | null {
  const lines = chunk.split('\n')
  let event = 'message'
  const dataLines: string[] = []

  for (const line of lines) {
    if (line.startsWith('event:')) {
      event = line.slice(6).trim()
    }

    if (line.startsWith('data:')) {
      dataLines.push(line.slice(5).trim())
    }
  }

  if (!dataLines.length) return null

  return {
    event,
    data: dataLines.join('\n'),
  }
}

function buildSseEndpoint(baseUrl: string) {
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`

  return new URL('sse/subscribe', normalizedBaseUrl).toString()
}

function upsertLinkItem(items: LinkItem[], nextItem: LinkItem) {
  const filteredItems = items.filter((item) => item.id !== nextItem.id)

  return [nextItem, ...filteredItems]
}

function isCompletedLink(item?: LinkItem): item is LinkItem {
  return item?.processingStatus === 'READY'
}

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function debugLog(message: string, payload?: unknown) {
  if (!isDevelopment) return

  if (payload === undefined) {
    console.log(`[LinkSseSubscriber] ${message}`)
    return
  }

  console.log(`[LinkSseSubscriber] ${message}`, payload)
}

async function invalidateLinkRelatedQueries(queryClient: QueryClient) {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: linkKeys.all }),
    queryClient.invalidateQueries({ queryKey: referenceKeys.lists() }),
    queryClient.invalidateQueries({ queryKey: myPageKeys.stats() }),
  ])
}

async function patchCompletedLinkCaches(
  queryClient: QueryClient,
  completedLink: LinkItem,
) {
  const cachedLists = queryClient.getQueriesData<RequestGetLinkListResponse>({
    queryKey: linkKeys.lists(),
  })

  let didPatchCache = false

  cachedLists.forEach(([queryKey, cachedData]) => {
    if (!cachedData) return

    const [, , referenceId] = queryKey as ReturnType<typeof linkKeys.list>
    const shouldIncludeItem =
      referenceId === undefined || referenceId === completedLink.reference.id

    if (!shouldIncludeItem) return

    didPatchCache = true

    queryClient.setQueryData<RequestGetLinkListResponse>(queryKey, {
      ...cachedData,
      data: {
        ...cachedData.data,
        contents: upsertLinkItem(cachedData.data.contents, completedLink),
      },
    })
  })

  if (!didPatchCache) {
    await Promise.all([
      queryClient.fetchQuery({
        queryKey: linkKeys.list(),
        queryFn: () => requestGetLinkList({}),
      }),
      queryClient.fetchQuery({
        queryKey: linkKeys.list(completedLink.reference.id),
        queryFn: () =>
          requestGetLinkList({ referenceId: completedLink.reference.id }),
      }),
    ])
  }
}

async function syncCompletedLink(
  queryClient: QueryClient,
  userLinkId: number,
  maxAttempts: number,
) {
  let completedLink: LinkItem | undefined

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      const cardResponse = await requestGetLinkCard(userLinkId)
      completedLink = cardResponse.data
      debugLog('read-only card fetched', {
        userLinkId,
        attempt: attempt + 1,
        title: completedLink.title,
      })
    } catch (error) {
      debugLog('read-only card fetch failed', {
        userLinkId,
        attempt: attempt + 1,
        error,
      })
    }

    if (isCompletedLink(completedLink)) {
      break
    }

    if (attempt < maxAttempts - 1) {
      await wait(LINK_SYNC_RETRY_DELAY_MS)
    }
  }

  if (!isCompletedLink(completedLink)) {
    debugLog('completed link sync timed out', { userLinkId })
    return false
  }

  try {
    await patchCompletedLinkCaches(queryClient, completedLink)
  } catch (error) {
    debugLog('list cache patch failed', {
      userLinkId,
      error,
    })
    return false
  }

  return true
}

export function LinkSseSubscriber() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const pendingLinks = usePendingLinkStore((state) => state.pendingLinks)
  const removePendingLink = usePendingLinkStore(
    (state) => state.removePendingLink,
  )
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!isLoggedIn) return

    let accessToken = localStorage.getItem('accessToken')
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    if (!accessToken || !baseUrl) return

    const endpoint = buildSseEndpoint(baseUrl)
    const abortController = new AbortController()
    let retryTimer: ReturnType<typeof setTimeout> | null = null
    let isDisposed = false

    const scheduleReconnect = (delay: number) => {
      if (abortController.signal.aborted || isDisposed) return

      if (retryTimer) {
        clearTimeout(retryTimer)
      }

      retryTimer = setTimeout(() => {
        void connect()
      }, delay)
    }

    const handleLinkCompleted = async (payload: LinkSseEventData) => {
      const userLinkId = payload.userLinkId

      if (!userLinkId) return

      debugLog('link_completed received', payload)

      const isCompletedLinkSynced = await syncCompletedLink(
        queryClient,
        userLinkId,
        LINK_SYNC_RETRY_COUNT,
      )

      if (!isCompletedLinkSynced) {
        return
      }

      removePendingLink(userLinkId)
      debugLog('pending link removed', { userLinkId })

      await invalidateLinkRelatedQueries(queryClient)
      debugLog('queries invalidated', { userLinkId })
    }

    const handleLinkFailed = async (payload: LinkSseEventData) => {
      const userLinkId = payload.userLinkId

      if (!userLinkId) return

      removePendingLink(userLinkId)
      debugLog('pending link removed due to failure', payload)

      showErrorToast('링크 카드 생성에 실패했어요. 다시 시도해 주세요.')
      await invalidateLinkRelatedQueries(queryClient)
    }

    const connect = async () => {
      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            Accept: 'text/event-stream',
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: 'include',
          cache: 'no-store',
          signal: abortController.signal,
        })

        if (response.status === 401) {
          const refreshedAccessToken = await requestRefreshAccessToken()

          if (refreshedAccessToken && !isDisposed) {
            accessToken = refreshedAccessToken
            scheduleReconnect(500)
          }

          return
        }

        if (!response.ok || !response.body) {
          throw new Error(
            `SSE connection failed with status ${response.status}`,
          )
        }

        debugLog('SSE connected')

        const reader = response.body.getReader()
        const decoder = new TextDecoder('utf-8')
        let buffer = ''

        while (!isDisposed) {
          const { done, value } = await reader.read()

          if (done) {
            debugLog('SSE stream closed by server')
            break
          }

          buffer += decoder.decode(value, { stream: true }).replace(/\r/g, '')

          let separatorIndex = buffer.indexOf('\n\n')

          while (separatorIndex !== -1) {
            const rawEvent = buffer.slice(0, separatorIndex).trim()
            buffer = buffer.slice(separatorIndex + 2)

            if (rawEvent) {
              const parsedEvent = parseSseChunk(rawEvent)
              debugLog('raw SSE event received', parsedEvent)

              if (parsedEvent?.event === 'link_completed') {
                try {
                  const payload = JSON.parse(
                    parsedEvent.data,
                  ) as LinkSseEventData
                  await handleLinkCompleted(payload)
                } catch (error) {
                  console.error('SSE link_completed handling failed', error)
                }
              }

              if (parsedEvent?.event === 'link_failed') {
                try {
                  const payload = JSON.parse(
                    parsedEvent.data,
                  ) as LinkSseEventData
                  await handleLinkFailed(payload)
                } catch (error) {
                  console.error('SSE link_failed handling failed', error)
                }
              }
            }

            separatorIndex = buffer.indexOf('\n\n')
          }
        }

        if (!abortController.signal.aborted && !isDisposed) {
          scheduleReconnect(LINK_SSE_RECONNECT_DELAY_MS)
        }
      } catch (error) {
        if (abortController.signal.aborted || isDisposed) return

        debugLog('SSE connection error', error)
        scheduleReconnect(LINK_SSE_ERROR_RECONNECT_DELAY_MS)
      }
    }

    void connect()

    return () => {
      isDisposed = true

      if (retryTimer) {
        clearTimeout(retryTimer)
      }

      abortController.abort()
    }
  }, [isLoggedIn, queryClient, removePendingLink])

  useEffect(() => {
    if (!isLoggedIn || !pendingLinks.length) return

    const now = Date.now()

    for (const pendingLink of pendingLinks) {
      if (now - pendingLink.createdAt > MAX_PENDING_LINK_AGE_MS) {
        removePendingLink(pendingLink.id)
        debugLog('pending link expired', { userLinkId: pendingLink.id })
        showErrorToast('링크 카드 생성이 지연되고 있어요. 다시 시도해 주세요.')
        void invalidateLinkRelatedQueries(queryClient)
      }
    }
  }, [isLoggedIn, pendingLinks, queryClient, removePendingLink])

  return null
}
