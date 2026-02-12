'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ConfirmModal } from '../Modal/ConfirmModal'

interface MyLinkCardHeaderProps {
  title: string
  colorCode: string
  onDelete: () => void
}

export function MyLinkCardHeader({
  title,
  colorCode,
  onDelete,
}: MyLinkCardHeaderProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsOpenMenu(false)
    setIsConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    onDelete()
    setIsConfirmOpen(false)
  }

  return (
    <div className="relative flex h-[38px] items-center justify-between px-12 pt-2">
      <div className="flex items-center gap-8">
        <div
          className="h-[10px] w-[10px] rounded-[2px]"
          style={{ backgroundColor: colorCode }}
        />
        <span className="text-caption-1 text-gray-disabled">{title}</span>
      </div>
      <button
        className="cursor-pointer p-2"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpenMenu(!isOpenMenu)
        }}
      >
        <Image src="/icons/more.svg" alt="more" width={22} height={22} />
      </button>
      {isOpenMenu && (
        <button
          onClick={handleDelete}
          className="rounded-15 text-body-1 text-gray-default absolute right-[-120px] bottom-36 flex w-210 cursor-pointer justify-between bg-[#FEFEFE] px-20 py-12 shadow-[0px_0px_10px_1px_rgba(0,0,0,0.05)]"
        >
          삭제
          <Image src="/icons/delete.svg" alt="delete" width={22} height={22} />
        </button>
      )}
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="링크 카드를 삭제하시겠어요?"
        description="삭제한 링크 카드는 복원할 수 없습니다."
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}

interface OtherLinkCardHeaderProps {
  category: string
}

export function OtherLinkCardHeader({ category }: OtherLinkCardHeaderProps) {
  return (
    <div className="flex h-[38px] items-center px-12 pt-2">
      <span className="text-caption-1 text-gray-disabled">{category}</span>
    </div>
  )
}
