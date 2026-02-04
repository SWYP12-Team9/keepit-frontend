import { useDeleteLinkMutation } from '@/src/apis/query/link/useDeleteLinkMutation'
import { MyLinkCard } from '@/src/components/LinkCard'
import { LinkItem } from '@/src/types/link/link'
import Image from 'next/image'

interface LinkListContainerProps {
  linkList: LinkItem[]
  isLoading: boolean
}

export function LinkListContainer({
  linkList,
  isLoading,
}: LinkListContainerProps) {
  const { mutateAsync: deleteLink } = useDeleteLinkMutation()

  const handleDelete = async (id: number) => {
    await deleteLink(id)
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
          <MyLinkCard key={item.id} data={item} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}
