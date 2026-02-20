import { linkKeys } from '@/src/apis/query/link/linkKeys'
import { useDeleteLinkMutation } from '@/src/apis/query/link/useDeleteLinkMutation'
import { useGetLinkDetails } from '@/src/apis/query/link/useGetLinkDetails'
import { requestGetLinkDetails } from '@/src/apis/request/requestGetLinkDetails'
import { Drawer } from '@/src/components/Drawer'
import { EmptyLinks } from '@/src/components/EmptyLinks/EmptyLinks'
import { MyLinkCard } from '@/src/components/LinkCard'
import { MoveLinkModal } from '@/src/components/Modal/MoveLinkModal'
import { useDrawerStore } from '@/src/store/drawerStore'
import { LinkItem, SearchLinkItem } from '@/src/types/link/link'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface LinkListContainerProps {
  linkList: LinkItem[] | SearchLinkItem[]
  isLoading: boolean
  isSearchMode: boolean
  showTitle?: boolean
  isReferenceDetail?: boolean
  requireLoginMessage?: string
}

export function LinkListContainer({
  linkList,
  isLoading,
  isSearchMode,
  showTitle = true,
  isReferenceDetail = false,
  requireLoginMessage,
}: LinkListContainerProps) {
  const queryClient = useQueryClient()
  const [selectedLinkId, setSelectedLinkId] = useState<number | null>(null)
  const [isMoveLinkModalOpen, setMoveLinkModalOpen] = useState(false)

  const openDrawer = useDrawerStore((state) => state.open)

  const { mutateAsync: deleteLink } = useDeleteLinkMutation()
  const { data: linkDetailsData, isLoading: isLinkDetailsLoading } =
    useGetLinkDetails(selectedLinkId)

  const linkDetails = linkDetailsData?.data

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

  const handleOpenLinkDetail = async (id: number) => {
    setSelectedLinkId(id)
    try {
      await queryClient.fetchQuery({
        queryKey: linkKeys.detail(id),
        queryFn: () => requestGetLinkDetails(id),
      })

      await queryClient.invalidateQueries({
        queryKey: linkKeys.lists(),
      })

      openDrawer()
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error)
    }
  }

  const handleOpenMoveLinkModal = () => {
    setMoveLinkModalOpen(true)
  }

  if (requireLoginMessage) {
    return <div className="pt-35 text-center">{requireLoginMessage}</div>
  }

  return isLoading ? (
    <div className="pt-35 text-center">Loading...</div>
  ) : linkList.length ? (
    <div className="flex w-full flex-col gap-30 pt-23">
      {showTitle && (
        <span className="text-24 text-gray-default leading-28 font-semibold">
          내 링크
        </span>
      )}
      <div className="flex flex-wrap gap-10">
        {linkList.map((item: LinkItem | SearchLinkItem) => (
          <div
            key={item.id}
            onClick={() => handleOpenLinkDetail(item.id)}
            className="w-full sm:w-auto"
          >
            <MyLinkCard data={item} onDelete={handleDelete} />
          </div>
        ))}
      </div>

      {!isLinkDetailsLoading && (
        <Drawer
          linkId={linkDetails?.id ?? 0}
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
