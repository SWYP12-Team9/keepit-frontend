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
      {!isLinkDetailsLoading && isDrawerOpen && (
        <Drawer
          key={linkDetails?.id ?? 0}
          linkId={linkDetails?.id ?? 0}
          onMoveLinkModalOpen={handleOpenMoveLinkModal}
          categoryColor={linkDetails?.reference?.colorCode ?? ''}
          categoryName={linkDetails?.reference?.title ?? ''}
          isDefault={linkDetails?.reference?.isDefault ?? false}
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
