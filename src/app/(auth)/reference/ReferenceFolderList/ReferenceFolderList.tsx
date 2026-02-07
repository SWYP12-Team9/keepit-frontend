'use client'

import { ReferenceItem } from '@/src/types/reference/reference'
import ReferenceFolderItem from '../ReferenceFolderItem/ReferenceFolderItem'

export default function ReferenceFolderList({
  data,
}: {
  data: ReferenceItem[]
}) {
  return (
    <div className="grid w-full grid-cols-6 gap-x-29 gap-y-20 py-20">
      {data.map((item) => (
        <ReferenceFolderItem key={item.id} item={item} />
      ))}
    </div>
  )
}
