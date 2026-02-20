'use client'

import { OtherLinkCard } from '@/src/components/LinkCard'
import { OtherUserLinkItem } from '@/src/types/recommendations/recommendations'
import { SaveOtherUserLinkModal } from '../SaveOtherUserLinkModal/SaveOtherUserLinkModal'
import { useEffect, useRef, useState } from 'react'
import { EmptyLinks } from '@/src/components/EmptyLinks/EmptyLinks'

interface OtherUserLinksContainerProps {
  otherUserLinkList: OtherUserLinkItem[]
  isLoading: boolean
  onLoadMore?: () => void
  hasMore?: boolean
  isFetchingNextPage?: boolean
}

export function OtherUserLinksContainer({
  otherUserLinkList,
  isLoading,
  onLoadMore,
  hasMore,
  isFetchingNextPage,
}: OtherUserLinksContainerProps) {
  const [selectedLink, setSelectedLink] = useState<OtherUserLinkItem | null>(
    null,
  )
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasMore || isFetchingNextPage || isLoading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore?.()
        }
      },
      { threshold: 0.1 },
    )

    const currentObserverTarget = observerRef.current
    if (currentObserverTarget) {
      observer.observe(currentObserverTarget)
    }

    return () => {
      if (currentObserverTarget) {
        observer.unobserve(currentObserverTarget)
      }
    }
  }, [hasMore, onLoadMore, isFetchingNextPage, isLoading])

  return isLoading && !otherUserLinkList.length ? (
    <div className="text-center">Loading...</div>
  ) : otherUserLinkList.length ? (
    <div className="relative h-full min-h-0">
      <div className="scrollbar-hide h-full overflow-y-auto pb-24">
        <ul className="flex flex-wrap gap-10">
          {otherUserLinkList?.map((item: OtherUserLinkItem, index: number) => (
            <li
              key={`${item.id}-${index}`}
              onClick={() => setSelectedLink(item)}
              className="w-full sm:w-auto"
            >
              <OtherLinkCard data={item} />
            </li>
          ))}
        </ul>
        {hasMore && <div ref={observerRef} className="h-20 w-full" />}
      </div>

      {selectedLink && (
        <SaveOtherUserLinkModal
          data={selectedLink}
          onClose={() => setSelectedLink(null)}
        />
      )}
    </div>
  ) : (
    <EmptyLinks
      message="찾는 링크가 없어요."
      imageProps={{
        src: '/images/empty-link.png',
        alt: 'empty link',
        width: 92,
        height: 71,
      }}
    />
  )
}
