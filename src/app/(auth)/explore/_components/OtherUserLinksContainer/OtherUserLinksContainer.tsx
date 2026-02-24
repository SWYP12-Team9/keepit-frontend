'use client'

import { EmptyLinks } from '@/src/components/EmptyLinks/EmptyLinks'
import { OtherLinkCard } from '@/src/components/LinkCard'
import { useIntersectionObserver } from '@/src/hooks/useIntersectionObserver'
import { OtherUserLinkItem } from '@/src/types/recommendations/recommendations'
import { useState } from 'react'
import { SaveOtherUserLinkModal } from '../SaveOtherUserLinkModal/SaveOtherUserLinkModal'

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

  const { bottomRef } = useIntersectionObserver({
    onIntersect: onLoadMore || (() => {}),
    hasNextPage: hasMore,
    isFetching: isFetchingNextPage,
  })

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
        <div ref={bottomRef} className="h-20 w-full" />
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
