import { useDeleteLinkMutation } from '@/src/apis/query/link/useDeleteLinkMutation'
import { useGetLinkDetails } from '@/src/apis/query/link/useGetLinkDetails'
import { Drawer } from '@/src/components/Drawer'
import { EmptyLinks } from '@/src/components/EmptyLinks/EmptyLinks'
import { MyLinkCard } from '@/src/components/LinkCard'
import { MoveLinkModal } from '@/src/components/Modal/MoveLinkModal'
import { useDrawerStore } from '@/src/store/drawerStore'
import { LinkItem, SearchLinkItem } from '@/src/types/link/link'
import { useState } from 'react'

interface LinkListContainerProps {
  linkList: LinkItem[] | SearchLinkItem[]
  isLoading: boolean
  isSearchMode: boolean
}

export function LinkListContainer({
  linkList,
  isLoading,
  isSearchMode,
}: LinkListContainerProps) {
  const [selectedLinkId, setSelectedLinkId] = useState<number | null>(null)
  const [isMoveLinkModalOpen, setMoveLinkModalOpen] = useState(false)

  const openDrawer = useDrawerStore((state) => state.open)
  const initializeValues = useDrawerStore((state) => state.initializeValues)

  const { mutateAsync: deleteLink } = useDeleteLinkMutation()
  const { data: linkDetailsData, isLoading: isLinkDetailsLoading } =
    useGetLinkDetails(selectedLinkId)

  const linkDetails = linkDetailsData?.data

  const handleDelete = async (id: number) => {
    await deleteLink(id)
  }

  const handleOpenLinkDetail = (id: number) => {
    setSelectedLinkId(id)
    initializeValues({
      why: linkDetails?.why ?? '',
      memo: linkDetails?.memo ?? '',
    })
    openDrawer()
  }

  const handleOpenMoveLinkModal = () => {
    setMoveLinkModalOpen(true)
  }

  return isLoading ? (
    <div className="pt-35 text-center">Loading...</div>
  ) : linkList.length ? (
    <div className="flex w-full flex-col gap-30 pt-23">
      <span className="text-24 text-gray-default leading-28 font-semibold">
        내 링크
      </span>
      <div className="flex flex-wrap gap-10">
        {linkList.map((item: LinkItem | SearchLinkItem) => (
          <div key={item.id} onClick={() => handleOpenLinkDetail(item.id)}>
            <MyLinkCard data={item} onDelete={handleDelete} />
          </div>
        ))}
      </div>

      {!isLinkDetailsLoading && (
        <Drawer
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
          linkId={selectedLinkId}
        />
      )}
    </div>
  ) : (
    <EmptyLinks
      message={isSearchMode ? '찾는 링크가 없어요.' : '저장한 링크가 없어요.'}
      className="h-240"
      imageProps={{
        src: isSearchMode ? '/images/empty-link.png' : '/images/paper.png',
        alt: isSearchMode ? 'empty link' : 'paper',
        width: isSearchMode ? 92 : 57,
        height: isSearchMode ? 71 : 57,
      }}
    />
  )
}
