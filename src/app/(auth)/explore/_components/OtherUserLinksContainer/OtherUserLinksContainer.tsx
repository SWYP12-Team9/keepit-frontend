'use client'

import { OtherLinkCard } from '@/src/components/LinkCard'
import { OtherUserLinkItem } from '@/src/types/recommendations/recommendations'
import { SaveOtherUserLinkModal } from '../SaveOtherUserLinkModal/SaveOtherUserLinkModal'
import { useState } from 'react'

interface OtherUserLinksContainerProps {
  otherUserLinkList: OtherUserLinkItem[]
  isLoading: boolean
}

export function OtherUserLinksContainer({
  otherUserLinkList,
  isLoading,
}: OtherUserLinksContainerProps) {
  const [selectedLink, setSelectedLink] = useState<OtherUserLinkItem | null>(
    null,
  )

  return isLoading ? (
    <div className="text-center">Loading...</div>
  ) : (
    <div className="relative">
      <div className="flex flex-wrap gap-10">
        {otherUserLinkList?.map((item: OtherUserLinkItem) => (
          <div key={item.id} onClick={() => setSelectedLink(item)}>
            <OtherLinkCard data={item} />
          </div>
        ))}
      </div>
      {selectedLink && (
        <SaveOtherUserLinkModal
          data={selectedLink}
          onClose={() => setSelectedLink(null)}
        />
      )}
    </div>
  )
}
