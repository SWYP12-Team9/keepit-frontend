'use client'

import { useChatbotStore } from '@/src/store/chatbotStore'
import { cn } from '@/src/utils/cn'
import { ReferenceItem } from '@/src/types/reference/reference'
import ReferenceFolderItem from '../ReferenceFolderItem/ReferenceFolderItem'

export default function ReferenceFolderList({
  data,
}: {
  data: ReferenceItem[]
}) {
  const isChatbotOpen = useChatbotStore((state) => state.isOpen)

  return (
    <div
      className={cn(
        'grid w-full grid-cols-1 gap-x-29 gap-y-20 py-20 sm:grid-cols-2',
        isChatbotOpen
          ? 'lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
          : 'lg:grid-cols-4 xl:grid-cols-6',
      )}
    >
      {data.map((item) => (
        <ReferenceFolderItem key={item.id} item={item} />
      ))}
    </div>
  )
}
