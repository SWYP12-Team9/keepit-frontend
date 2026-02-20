'use client'

import { usePatchLinkMutation } from '@/src/apis/query/link/usePatchLinkMutation'
import { useDebounce } from '@/src/hooks/useDebounce'
import { useDrawerStore } from '@/src/store/drawerStore'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../Button'
import { Input } from '../Input'
import { TextArea } from '../TextArea'
import { Field } from './Field'

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
  linkId: number
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
  linkId,
}: DrawerProps) {
  const isOpen = useDrawerStore((state) => state.isOpen)
  const isClosing = useDrawerStore((state) => state.isClosing)
  const { mutate: patchLink } = usePatchLinkMutation()

  const closeDrawer = useDrawerStore((state) => state.close)
  const resetValues = useDrawerStore((state) => state.resetValues)

  const setWhy = useDrawerStore((state) => state.setWhy)
  const setMemo = useDrawerStore((state) => state.setMemo)

  const [localWhy, setLocalWhy] = useState(defaultWhy)
  const [localMemo, setLocalMemo] = useState(defaultMemo)
  const isInitialMount = useRef(true)

  const debouncedWhy = useDebounce({ value: localWhy, delay: 800 })
  const debouncedMemo = useDebounce({ value: localMemo, delay: 800 })

  useEffect(() => {
    if (!isOpen || !linkId) return

    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    if (debouncedWhy !== defaultWhy || debouncedMemo !== defaultMemo) {
      patchLink({
        userLinkId: linkId,
        body: {
          why: debouncedWhy,
          memo: debouncedMemo,
        },
      })
    }
  }, [
    debouncedMemo,
    debouncedWhy,
    defaultMemo,
    defaultWhy,
    isOpen,
    linkId,
    patchLink,
  ])

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
    <div className="fixed inset-0 z-50 flex justify-end md:items-center md:justify-center md:px-24 md:py-20">
      <button
        type="button"
        aria-label="상세 보기 닫기"
        onClick={handleClose}
        className="absolute inset-0 bg-black/30 md:bg-black/15"
      />

      <div
        className={`md:rounded-20 relative z-10 flex h-dvh w-full max-w-[405px] flex-col overflow-hidden bg-white p-20 shadow-xl md:h-[min(860px,calc(100dvh-40px))] md:max-w-[960px] md:p-30 ${
          isClosing
            ? 'animate-drawer-out md:animate-none'
            : 'animate-drawer-in md:animate-none'
        }`}
        onClick={(e) => e.stopPropagation()}
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

        <div className="scrollbar-hide flex min-h-0 flex-1 flex-col gap-20 overflow-y-auto pr-4">
          <Field label="제목" className="shrink-0">
            <div className="rounded-8 bg-white p-16">
              <p className="text-caption-1 text-gray-default leading-relaxed">
                {title}
              </p>
            </div>
          </Field>

          <Field label="이유" className="shrink-0">
            <Input
              defaultValue={defaultWhy}
              className="pr-80"
              onChange={(e) => {
                const value = e.target.value
                setLocalWhy(value)
                setWhy(value)
              }}
            />
          </Field>

          <Field label="링크" className="shrink-0">
            <div className="rounded-8 flex min-h-[54px] items-start bg-white p-16">
              <p className="text-caption-1 text-gray-default leading-relaxed break-all">
                {link}
              </p>
            </div>
          </Field>

          <Field label="Ai 핵심요약" className="shrink-0">
            <div className="rounded-8 bg-white p-16">
              <p className="text-caption-1 text-gray-default leading-relaxed">
                {aiSummary}
              </p>
            </div>
          </Field>

          <Field label="메모" className="shrink-0">
            <TextArea
              className="bg-gray-field h-200 resize-none border-none"
              defaultValue={defaultMemo}
              onChange={(e) => {
                const value = e.target.value
                setLocalMemo(value)
                setMemo(value)
              }}
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
    </div>
  ) : null
}
