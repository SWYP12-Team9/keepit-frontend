'use client'

import Image from 'next/image'
import { Button } from '../Button'
import { Input } from '../Input'
import { TextArea } from '../TextArea'
import { Field } from './Field'
import { useDrawerStore } from '@/src/store/drawerStore'

interface DrawerProps {
  onMoveLinkModalOpen: () => void
  categoryColor: string
  categoryName: string
  viewCount: number
  title: string
  defaultWhy: string
  link: string
  aiSummary: string
  defaultMemo: string
}

export function Drawer({
  onMoveLinkModalOpen,
  categoryColor,
  categoryName,
  viewCount,
  title,
  defaultWhy,
  link,
  aiSummary,
  defaultMemo,
}: DrawerProps) {
  const isOpen = useDrawerStore((state) => state.isOpen)
  const isClosing = useDrawerStore((state) => state.isClosing)

  const closeDrawer = useDrawerStore((state) => state.close)
  const resetValues = useDrawerStore((state) => state.resetValues)

  const setWhy = useDrawerStore((state) => state.setWhy)
  const setMemo = useDrawerStore((state) => state.setMemo)

  const handleClose = () => {
    resetValues()
    closeDrawer()
  }

  const handleOpenLink = () => {
    if (!link) return
    const url = link.startsWith('http') ? link : `https://${link}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return isOpen ? (
    <div
      className={`fixed top-0 right-0 z-50 flex h-screen w-[405px] flex-col overflow-hidden bg-white p-30 shadow-xl ${
        isClosing ? 'animate-drawer-out' : 'animate-drawer-in'
      }`}
    >
      <div className="mb-24 flex shrink-0 items-center justify-between">
        <Image
          src="../icons/close-tab.svg"
          alt="close"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={handleClose}
        />
        <div className="flex items-center gap-[2px]">
          <Image src="../icons/view.svg" alt="view" width={22} height={22} />
          <span className="text-caption-1 text-gray-disabled mr-8">
            {viewCount}
          </span>
          <span className="text-caption-2 text-gray-disabled">열람</span>
        </div>
      </div>

      <div className="mb-[10px] flex shrink-0 items-center gap-8">
        <div
          className="rounded-4 h-[10px] w-[10px]"
          style={{ backgroundColor: categoryColor }}
        />
        <span className="text-caption-1">{categoryName}</span>
      </div>

      <div className="scrollbar-hide flex flex-1 flex-col gap-20 overflow-y-auto pr-4">
        <Field label="제목" className="shrink-0">
          <div className="rounded-8 bg-gray-field p-16">
            <p className="text-caption-1 text-gray-default leading-relaxed">
              {title}
            </p>
          </div>
        </Field>

        <Field label="이유" className="shrink-0">
          <Input
            defaultValue={defaultWhy}
            className="pr-80"
            onChange={(e) => setWhy(e.target.value)}
          />
        </Field>

        <Field label="링크" className="shrink-0">
          <Input
            defaultValue={link}
            className="cursor-pointer text-blue-500 underline"
          />
        </Field>

        <Field label="Ai 핵심요약" className="shrink-0">
          <div className="rounded-8 bg-gray-field p-16">
            <p className="text-caption-1 text-gray-default leading-relaxed">
              {aiSummary}
            </p>
          </div>
        </Field>

        <Field label="메모" className="shrink-0">
          <TextArea
            className="bg-gray-field h-200 resize-none border-none"
            defaultValue={defaultMemo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </Field>
      </div>

      <div className="mt-20 flex shrink-0 gap-12">
        <Button
          variant="secondary"
          width="w-full"
          height="h-54"
          onClick={handleOpenLink}
        >
          원문 열기
        </Button>
        <Button
          variant="primary"
          width="w-full"
          height="h-54"
          className="text-gray-default bg-blue-light-active"
          onClick={onMoveLinkModalOpen}
        >
          레퍼런스 폴더 이동
        </Button>
      </div>
    </div>
  ) : null
}
