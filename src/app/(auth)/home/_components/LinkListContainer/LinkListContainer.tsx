import { useDeleteLinkMutation } from '@/src/apis/query/link/useDeleteLinkMutation'
import { useGetLinkDetails } from '@/src/apis/query/link/useGetLinkDetails'
import { Drawer } from '@/src/components/Drawer'
import { MyLinkCard } from '@/src/components/LinkCard'
import { MoveLinkModal } from '@/src/components/Modal/MoveLinkModal'
import { LinkItem } from '@/src/types/link/link'
import Image from 'next/image'
import { useState } from 'react'

interface LinkListContainerProps {
  linkList: LinkItem[]
  isLoading: boolean
}

export function LinkListContainer({
  linkList,
  isLoading,
}: LinkListContainerProps) {
  const [selectedLinkId, setSelectedLinkId] = useState<number | null>(null)
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [isMoveLinkModalOpen, setMoveLinkModalOpen] = useState(false)

  const { mutateAsync: deleteLink } = useDeleteLinkMutation()
  const { data: linkDetailsData, isLoading: isLinkDetailsLoading } =
    useGetLinkDetails(selectedLinkId)

  const linkDetails = linkDetailsData?.data

  const handleDelete = async (id: number) => {
    await deleteLink(id)
  }

  const handleOpenLinkDetail = (id: number) => {
    setSelectedLinkId(id)
    setDrawerOpen(true)
  }

  const handleOpenMoveLinkModal = () => {
    setMoveLinkModalOpen(true)
  }

  return isLoading ? (
    <div className="pt-35 text-center">Loading...</div>
  ) : !linkList.length ? (
    <div className="flex flex-col items-center justify-center gap-20 pt-80">
      <Image src="/images/paper.png" alt="paper" width={57} height={71} />
      <span className="text-body-1 text-gray-default">
        저장한 링크가 없어요.
      </span>
    </div>
  ) : (
    <div className="flex w-full flex-col gap-30 pt-23">
      <span className="text-24 text-gray-default leading-28 font-semibold">
        내 링크
      </span>
      <div className="flex flex-wrap gap-10">
        {linkList.map((item: LinkItem) => (
          <div key={item.id} onClick={() => handleOpenLinkDetail(item.id)}>
            <MyLinkCard data={item} onDelete={handleDelete} />
          </div>
        ))}
      </div>
      {isDrawerOpen && !isLinkDetailsLoading && (
        <Drawer
          onClose={() => setDrawerOpen(false)}
          onMoveLinkModalOpen={handleOpenMoveLinkModal}
          categoryColor={linkDetails?.reference?.colorCode ?? ''}
          categoryName={linkDetails?.reference?.title ?? ''}
          viewCount={linkDetails?.viewCount ?? 0}
          title={linkDetails?.title ?? ''}
          reason={linkDetails?.why ?? ''}
          link={linkDetails?.url ?? ''}
          aiSummary={linkDetails?.aiSummary ?? ''}
          memo={linkDetails?.memo ?? ''}
        />
      )}
      {isMoveLinkModalOpen && (
        <MoveLinkModal
          isModalOpen={isMoveLinkModalOpen}
          onClose={() => setMoveLinkModalOpen(false)}
        />
      )}
    </div>
  )
}
