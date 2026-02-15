'use client'

import { useCreateReferenceFolderMutation } from '@/src/apis/query/reference/useCreateReferenceFolderMutation'
import { useGetReferenceList } from '@/src/apis/query/reference/useGetReferenceList'
import { Button } from '@/src/components/Button'
import { EmptyLinks } from '@/src/components/EmptyLinks/EmptyLinks'
import { LoginModal } from '@/src/components/LoginModal'
import { CreateFolderModal } from '@/src/components/Modal/CreateFolderModal'
import { Tab, Tabs } from '@/src/components/Tabs'
import { REFERENCE_TABS } from '@/src/constants/defaultTap'
import { useIntersectionObserver } from '@/src/hooks/useIntersectionObserver'
import { useAuthStore } from '@/src/store/authStore'
import { ReferenceVisibility } from '@/src/types/reference/reference'
import Image from 'next/image'
import { useState } from 'react'
import { FieldValues } from 'react-hook-form'
import ReferencFolderList from './ReferenceFolderList/ReferenceFolderList'

export default function Reference() {
  const [selectedTab, setSelectedTab] = useState<Tab>(REFERENCE_TABS[0])
  const [isCreateFolderModalOpen, setCreateFolderModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { isLoggedIn } = useAuthStore()

  const { mutate: createFolder } = useCreateReferenceFolderMutation()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetReferenceList({
      type: selectedTab.value as ReferenceVisibility,
    })

  const referenceList = data?.pages.flatMap((page) => page.data.contents) ?? []
  const isEmpty = referenceList.length === 0 && !isFetchingNextPage
  const showGuestDefaultFolder = !isLoggedIn && isEmpty

  const { bottomRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    hasNextPage,
    isFetching: isFetchingNextPage,
  })

  const onSubmit = (data: FieldValues) => {
    createFolder(
      {
        title: data.title,
        description: data.description,
        isPublic: data.isPublic,
        colorCode: data.colorCode,
      },
      {
        onSuccess: () => {
          setCreateFolderModalOpen(false)
        },
      },
    )
  }

  const handleCreateReferenceView = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true)
      return
    }

    setCreateFolderModalOpen(true)
  }

  return (
    <div className="scrollbar-hide h-full overflow-y-auto px-84">
      <div className="sticky top-0 z-10 mt-25 bg-white">
        <div className="flex items-end justify-between pb-16">
          <Tabs
            defaultTap={REFERENCE_TABS[0]}
            tabs={REFERENCE_TABS.slice(1)}
            selectedTab={selectedTab}
            onChange={setSelectedTab}
            variant="secondary"
          />

          <Button
            onClick={handleCreateReferenceView}
            width="w-172"
            height="h-42"
          >
            레퍼런스 뷰 생성
          </Button>
        </div>

        <CreateFolderModal
          isModalOpen={isCreateFolderModalOpen}
          setModalOpen={setCreateFolderModalOpen}
          onSubmit={onSubmit}
        />
        <LoginModal
          isOpen={isLoginModalOpen}
          onOpenChange={setIsLoginModalOpen}
        />
      </div>

      {showGuestDefaultFolder ? (
        <div className="py-20">
          <div className="grid w-full grid-cols-6 gap-x-29 gap-y-20">
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(true)}
              className="rounded-10 relative flex h-[107px] min-w-[148px] cursor-pointer flex-col border border-[#EBEBEB] bg-white px-15 pt-16 pb-14 text-left shadow-[0px_0px_5px_0px_#EAEAEA]"
            >
              <div className="relative h-28 w-36">
                <Image
                  src="/icons/default-reference-folder.svg"
                  alt="default folder icon"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="mt-auto flex flex-col gap-4">
                <h3 className="text-caption-1 text-gray-default text-[14px] leading-none">
                  미지정
                </h3>
                <p className="text-caption-2 text-gray-disabled leading-none">
                  0
                </p>
              </div>
            </button>
          </div>
        </div>
      ) : isEmpty ? (
        <div className="flex justify-center pt-100">
          <EmptyLinks
            message="생성된 폴더가 없어요."
            className="h-240"
            imageProps={{
              src: '/images/empty-folder.png',
              alt: 'empty reference',
              width: 92,
              height: 71,
            }}
          />
        </div>
      ) : (
        <ReferencFolderList data={referenceList} />
      )}

      <div ref={bottomRef} />

      {isFetchingNextPage && (
        <p className="text-caption-2 text-gray-disabled py-12 text-center">
          불러오는 중…
        </p>
      )}
    </div>
  )
}
