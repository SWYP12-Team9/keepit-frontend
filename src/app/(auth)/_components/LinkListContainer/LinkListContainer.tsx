import { useDeleteLinkMutation } from '@/src/apis/query/link/useDeleteLinkMutation'
import { EmptyLinks } from '@/src/components/EmptyLinks/EmptyLinks'
import { MyLinkCard } from '@/src/components/LinkCard'
import { useOpenLinkDrawer } from '@/src/hooks/useOpenLinkDrawer'
import { LinkItem, SearchLinkItem } from '@/src/types/link/link'

interface LinkListContainerProps {
  linkList: LinkItem[] | SearchLinkItem[]
  isLoading: boolean
  isSearchMode: boolean
  showTitle?: boolean
  isReferenceDetail?: boolean
}

export function LinkListContainer({
  linkList,
  isLoading,
  isSearchMode,
  showTitle = true,
  isReferenceDetail = false,
}: LinkListContainerProps) {
  const { mutateAsync: deleteLink } = useDeleteLinkMutation()
  const { openLinkDrawer } = useOpenLinkDrawer()

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
    try {
      await openLinkDrawer(id)
    } catch (error) {
      console.error('링크 상세를 여는 중 오류 발생:', error)
    }
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
            className="w-full min-w-0 sm:w-auto sm:flex-none"
          >
            <MyLinkCard data={item} onDelete={handleDelete} />
          </div>
        ))}
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
