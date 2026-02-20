'use client'

import { ReferenceItem } from '@/src/types/reference/reference'
import ReferenceFolderItem from '../ReferenceFolderItem/ReferenceFolderItem'

export default function ReferenceFolderList({
  data,
}: {
  data: ReferenceItem[]
}) {
  return (
    <div className="grid w-full grid-cols-1 gap-x-29 gap-y-20 py-20 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
      {data.map((item) => (
        <ReferenceFolderItem key={item.id} item={item} />
      ))}
    </div>
  )
}
