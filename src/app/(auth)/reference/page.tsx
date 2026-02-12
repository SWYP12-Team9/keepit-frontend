'use client'

import { useCreateReferenceFolderMutation } from '@/src/apis/query/reference/useCreateReferenceFolderMutation'
import { useGetReferenceList } from '@/src/apis/query/reference/useGetReferenceList'
import { Button } from '@/src/components/Button'
import { EmptyLinks } from '@/src/components/EmptyLinks/EmptyLinks'
import { CreateFolderModal } from '@/src/components/Modal/CreateFolderModal'
import { Tab, Tabs } from '@/src/components/Tabs'
import { REFERENCE_TABS } from '@/src/constants/defaultTap'
import { useIntersectionObserver } from '@/src/hooks/useIntersectionObserver'
import { ReferenceVisibility } from '@/src/types/reference/reference'
import { useState } from 'react'
import { FieldValues } from 'react-hook-form'
import ReferencFolderList from './ReferenceFolderList/ReferenceFolderList'

export default function Reference() {
  const [selectedTab, setSelectedTab] = useState<Tab>(REFERENCE_TABS[0])
  const [isCreateFolderModalOpen, setCreateFolderModalOpen] = useState(false)

  const { mutate: createFolder } = useCreateReferenceFolderMutation()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetReferenceList({
      type: selectedTab.value as ReferenceVisibility,
    })

  const referenceList = data?.pages.flatMap((page) => page.data.contents) ?? []
  const isEmpty = referenceList.length === 0 && !isFetchingNextPage

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
            onClick={() => setCreateFolderModalOpen(true)}
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
      </div>

      {isEmpty ? (
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
