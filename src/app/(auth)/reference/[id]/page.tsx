'use client'

import { useGetLinkList } from '@/src/apis/query/link/useGetLinkList'
import { useGetSearchLinks } from '@/src/apis/query/link/useGetSearchLinks'
import { useGetReferenceDetails } from '@/src/apis/query/reference/useGetReferenceDetails'
import { useGetReferenceList } from '@/src/apis/query/reference/useGetReferenceList'
import { usePatchReferenceMutation } from '@/src/apis/query/reference/usePatchReferenceMutation'
import { CreateFolderModal } from '@/src/components/Modal/CreateFolderModal'
import { FolderVisibleTab } from '@/src/components/Modal/FolderVisibleTab'
import { Tab, Tabs } from '@/src/components/Tabs'
import { TextArea } from '@/src/components/TextArea'
import { ALL_TAB } from '@/src/constants/defaultTap'
import { useDebounce } from '@/src/hooks/useDebounce'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { use, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { LinkListContainer } from '../../_components/LinkListContainer/LinkListContainer'
import { SearchLinksInput } from '../../_components/SearchLinksInput/SearchLinksInput'

export default function ReferenceDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isEditOpen, setIsEditOpen] = useState(false)
  const { mutate: patchReference } = usePatchReferenceMutation()

  const unwrappedParams = use(params)

  const isAllTab = unwrappedParams.id === 'all'
  const currentFolderId = isAllTab ? undefined : Number(unwrappedParams.id)

  const debouncedKeyword = useDebounce({
    value: searchKeyword,
    delay: 500,
  })

  const isSearchMode = debouncedKeyword.trim().length > 0

  const { data: linkListData, isLoading: isLinkListLoading } = useGetLinkList(
    isAllTab ? {} : { referenceId: currentFolderId },
  )

  const { data: searchLinksData, isLoading: isSearchLinksLoading } =
    useGetSearchLinks({
      keyword: debouncedKeyword,
      referenceId: currentFolderId,
      size: 20,
    })

  const { data: referenceList } = useGetReferenceList({ type: 'all' })
  const tabs =
    referenceList?.pages.flatMap((page) =>
      page.data.contents.map((item) => ({
        id: item.id,
        title: item.title,
      })),
    ) || []

  const { data: referenceDetailData } = useGetReferenceDetails(
    currentFolderId as number,
  )
  const folderDetail = isAllTab ? null : referenceDetailData?.data

  const [localIsPublic, setLocalIsPublic] = useState<boolean | null>(null)
  const serverIsPublic = folderDetail?.isPublic
  const visibleIsPublic = localIsPublic ?? serverIsPublic

  const linkList = isSearchMode
    ? (searchLinksData?.data?.contents ?? [])
    : (linkListData?.data?.contents ?? [])

  const isLoading = isSearchMode ? isSearchLinksLoading : isLinkListLoading

  const handleTabChange = (tab: Tab) => {
    router.push(`/reference/${tab.id}`)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditOpen(true)
  }

  const initialEditData = {
    title: referenceDetailData?.data.title,
    colorCode: referenceDetailData?.data.colorCode,
    description: referenceDetailData?.data.description,
    isPublic: referenceDetailData?.data.isPublic,
  }

  const handleEditSubmit = (formData: FieldValues) => {
    patchReference(
      {
        referenceId: currentFolderId!,
        body: {
          title: formData.title,
          colorCode: formData.colorCode,
          description: formData.description,
          isPublic: formData.isPublic,
        },
      },
      {
        onSuccess: () => {
          setIsEditOpen(false)
        },
      },
    )
  }

  return (
    <div className="scrollbar-hide h-full overflow-y-auto px-84">
      <div className="sticky top-0 z-10 mt-25 bg-white">
        {isAllTab && (
          <div className="flex flex-col">
            <SearchLinksInput
              value={searchKeyword}
              onChange={(val) => setSearchKeyword(val)}
            />
            <div className="pt-35" />
          </div>
        )}

        <Tabs
          className="pb-12"
          defaultTap={ALL_TAB}
          tabs={tabs}
          selectedTab={
            isAllTab
              ? ALL_TAB
              : tabs.find((t) => t.id === currentFolderId) || null
          }
          onChange={handleTabChange}
        />

        {!isAllTab && (
          <>
            <div className="flex flex-col gap-24 pt-35 pb-32">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-12">
                  <h1 className="text-heading-3 text-gray-default">
                    {folderDetail?.title}
                  </h1>
                  <button
                    className="flex h-24 w-24 items-center justify-center"
                    onClick={handleEdit}
                  >
                    <Image
                      src="/icons/edit.svg"
                      alt="edit"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>

                {visibleIsPublic !== undefined && (
                  <FolderVisibleTab
                    isPublic={visibleIsPublic}
                    setIsPublic={setLocalIsPublic}
                  />
                )}
              </div>

              <div className="flex flex-col gap-8">
                <span className="text-body-1 text-gray-default mt-20">
                  메모
                </span>
                <TextArea
                  className="rounded-8 text-body-3 text-gray-default bg-gray-field h-[95px] shrink-0 px-20 py-14"
                  value={folderDetail?.description ?? ''}
                  onChange={() => {}}
                />
              </div>
            </div>

            <div className="pb-12">
              <SearchLinksInput
                value={searchKeyword}
                onChange={(val) => setSearchKeyword(val)}
              />
            </div>
          </>
        )}
      </div>

      <div className="mt-44">
        <LinkListContainer
          linkList={linkList}
          isLoading={isLoading}
          isSearchMode={isSearchMode}
          showTitle={false}
        />
      </div>
      <CreateFolderModal
        isModalOpen={isEditOpen}
        setModalOpen={setIsEditOpen}
        onSubmit={handleEditSubmit}
        initialData={initialEditData}
      />
    </div>
  )
}
