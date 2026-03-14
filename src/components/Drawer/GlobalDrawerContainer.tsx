'use client'

import { useGetLinkDetails } from '@/src/apis/query/link/useGetLinkDetails'
import { Drawer } from '@/src/components/Drawer'
import { MoveLinkModal } from '@/src/components/Modal/MoveLinkModal'
import { useDrawerStore } from '@/src/store/drawerStore'
import { useState } from 'react'

export function GlobalDrawerContainer() {
  const linkId = useDrawerStore((state) => state.linkId)
  const isDrawerOpen = useDrawerStore((state) => state.isOpen)
  const [isMoveLinkModalOpen, setMoveLinkModalOpen] = useState(false)

  const { data: linkDetailsData, isLoading: isLinkDetailsLoading } =
    useGetLinkDetails(linkId)

  const linkDetails = linkDetailsData?.data

  const handleOpenMoveLinkModal = () => {
    setMoveLinkModalOpen(true)
  }

  // Only render Drawer contents when we have a linkId and it is loaded
  if (!linkId) return null

  return (
    <>
      {isDrawerOpen && (
        <Drawer
          key={`${linkId}-${isLinkDetailsLoading ? 'loading' : 'ready'}`}
          linkId={linkId}
          isLoading={isLinkDetailsLoading}
          onMoveLinkModalOpen={handleOpenMoveLinkModal}
          categoryColor={linkDetails?.reference?.colorCode ?? ''}
          categoryName={linkDetails?.reference?.title ?? ''}
          viewCount={linkDetails?.viewCount ?? 0}
          title={linkDetails?.title ?? ''}
          defaultWhy={linkDetails?.why ?? ''}
          link={linkDetails?.url ?? ''}
          aiSummary={linkDetails?.aiSummary ?? ''}
          defaultMemo={linkDetails?.memo ?? ''}
        />
      )}
      {isMoveLinkModalOpen && (
        <MoveLinkModal
          isModalOpen={isMoveLinkModalOpen}
          onClose={() => setMoveLinkModalOpen(false)}
          linkId={linkId}
        />
      )}
    </>
  )
}
