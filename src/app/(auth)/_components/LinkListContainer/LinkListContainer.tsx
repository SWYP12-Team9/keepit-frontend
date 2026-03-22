import { useDeleteLinkMutation } from '@/src/apis/query/link/useDeleteLinkMutation'
import { EmptyLinks } from '@/src/components/EmptyLinks/EmptyLinks'
import { MyLinkCard, PendingLinkCard } from '@/src/components/LinkCard'
import { useOpenLinkDrawer } from '@/src/hooks/useOpenLinkDrawer'
import {
  PendingLinkItem,
  usePendingLinkStore,
} from '@/src/store/pendingLinkStore'
import { LinkItem, SearchLinkItem } from '@/src/types/link/link'
import { useEffect, useMemo, useRef, useState } from 'react'

interface LinkListContainerProps {
  linkList: LinkItem[] | SearchLinkItem[]
  isLoading: boolean
  isSearchMode: boolean
  showTitle?: boolean
  isReferenceDetail?: boolean
  referenceId?: number
}

export function LinkListContainer({
  linkList,
  isLoading,
  isSearchMode,
  showTitle = true,
  isReferenceDetail = false,
  referenceId,
}: LinkListContainerProps) {
  const { mutateAsync: deleteLink } = useDeleteLinkMutation()
  const { openLinkDrawer } = useOpenLinkDrawer()
  const pendingLinks = usePendingLinkStore((state) => state.pendingLinks)
  const previousPendingIdsRef = useRef<Set<number>>(new Set())
  const timeoutIdsRef = useRef<number[]>([])
  const [animatingCompletedIds, setAnimatingCompletedIds] = useState<
    Set<number>
  >(new Set())

  const handleDelete = async (id: number) => {
    await deleteLink(id)
  }

  const getEmptyStateProps = () => {
    if (isSearchMode) {
      return {
        message: '찾는 링크가 없어요.',
        src: '/images/empty-link.png',
        width: 92,
        height: 71,
        alt: 'empty link',
      }
    }

    if (isReferenceDetail) {
      return {
        message: '저장된 링크가 없어요.',
        src: '/images/referencedetail-empty.png',
        width: 92,
        height: 71,
        alt: 'empty link',
      }
    }

    return {
      message: '저장한 링크가 없어요.',
      src: '/images/paper.png',
      width: 57,
      height: 57,
      alt: 'paper',
    }
  }

  const emptyProps = getEmptyStateProps()
  const visiblePendingLinks = useMemo(
    () =>
      isSearchMode
        ? []
        : pendingLinks.filter((item) =>
            referenceId ? item.reference?.id === referenceId : true,
          ),
    [isSearchMode, pendingLinks, referenceId],
  )

  const pendingIds = useMemo(
    () => new Set(visiblePendingLinks.map((item) => item.id)),
    [visiblePendingLinks],
  )
  const displayLinkList = isSearchMode
    ? linkList
    : [
        ...visiblePendingLinks,
        ...linkList.filter((item) => !pendingIds.has(item.id)),
      ]

  useEffect(() => {
    const previousPendingIds = previousPendingIdsRef.current
    const completedIds = [...previousPendingIds].filter(
      (id) => !pendingIds.has(id),
    )

    if (completedIds.length) {
      setAnimatingCompletedIds((currentIds) => {
        const nextIds = new Set(currentIds)
        completedIds.forEach((id) => nextIds.add(id))
        return nextIds
      })

      completedIds.forEach((id) => {
        const timeoutId = window.setTimeout(() => {
          setAnimatingCompletedIds((currentIds) => {
            const nextIds = new Set(currentIds)
            nextIds.delete(id)
            return nextIds
          })
        }, 520)

        timeoutIdsRef.current.push(timeoutId)
      })
    }

    previousPendingIdsRef.current = new Set(pendingIds)
  }, [pendingIds])

  useEffect(() => {
    const timeoutIds = timeoutIdsRef.current

    return () => {
      timeoutIds.forEach((timeoutId) => {
        window.clearTimeout(timeoutId)
      })
    }
  }, [])

  const handleOpenLinkDetail = async (id: number) => {
    try {
      await openLinkDrawer(id)
    } catch (error) {
      console.error('링크 상세를 여는 중 오류 발생:', error)
    }
  }

  return isLoading ? (
    <div className="pt-35 text-center">Loading...</div>
  ) : displayLinkList.length ? (
    <div className="flex w-full flex-col gap-30 pt-23">
      {showTitle && (
        <span className="text-24 text-gray-default leading-28 font-semibold">
          내 링크
        </span>
      )}
      <div className="flex flex-wrap gap-10">
        {displayLinkList.map((item) => {
          const isProcessing = item.processingStatus === 'PENDING'
          const shouldAnimateCompletion =
            !isProcessing && animatingCompletedIds.has(item.id)
          const wrapperClassName = `w-full min-w-0 sm:w-auto sm:flex-none ${shouldAnimateCompletion ? 'animate-in fade-in zoom-in-[0.99] slide-in-from-bottom-3 duration-500 ease-out' : ''}`

          return isProcessing ? (
            <div key={item.id} className={wrapperClassName}>
              <PendingLinkCard data={item as PendingLinkItem} />
            </div>
          ) : (
            <div
              key={item.id}
              onClick={() => handleOpenLinkDetail(item.id)}
              className={wrapperClassName}
            >
              <MyLinkCard data={item} onDelete={handleDelete} />
            </div>
          )
        })}
      </div>
    </div>
  ) : (
    <EmptyLinks
      message={emptyProps.message}
      className="h-240"
      imageProps={{
        src: emptyProps.src,
        alt: emptyProps.alt,
        width: emptyProps.width,
        height: emptyProps.height,
      }}
    />
  )
}
