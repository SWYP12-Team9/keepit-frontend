'use client'

import { useDeletReferenceMutation } from '@/src/apis/query/reference/useDeleteReferenceMutation'
import { useGetReferenceDetails } from '@/src/apis/query/reference/useGetReferenceDetails'
import { usePatchReferenceMutation } from '@/src/apis/query/reference/usePatchReferenceMutation'
import { CreateFolderModal } from '@/src/components/Modal/CreateFolderModal'
import { ReferenceItem } from '@/src/types/reference/reference'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues } from 'react-hook-form'

interface ReferenceFolderItemProps {
  item: ReferenceItem
}

export default function ReferenceFolderItem({
  item,
}: ReferenceFolderItemProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const { mutateAsync: deleteReference } = useDeletReferenceMutation()
  const { mutate: patchReference } = usePatchReferenceMutation()

  const { data: referenceDetailData } = useGetReferenceDetails(
    isEditOpen ? item.id : null,
  )
  const router = useRouter()

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    setIsOpenMenu(false)
    await deleteReference(id)
  }

  const handleFolderClick = () => {
    router.push(`/reference/${item.id}`)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpenMenu(false)
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
        referenceId: item.id,
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
    <div
      onClick={handleFolderClick}
      className="group rounded-10 relative flex h-[107px] min-w-[148px] cursor-pointer flex-col border border-[#EBEBEB] bg-white px-15 pt-16 pb-14 shadow-[0px_0px_5px_0px_#EAEAEA]"
    >
      <div className="flex items-start justify-between">
        <div className="relative h-28 w-36">
          <Image
            src={
              item.isDefault
                ? '/icons/default-reference-folder.svg'
                : '/icons/reference-folder.svg'
            }
            alt="folder icon"
            fill
            className="object-contain"
          />
        </div>

        {!item.isDefault && (
          <div className="relative">
            <button
              className="-mr-4 flex cursor-pointer items-center justify-center p-4"
              onClick={(e) => {
                e.stopPropagation()
                setIsOpenMenu(!isOpenMenu)
              }}
            >
              <Image
                src="/icons/vertical-more.svg"
                alt="more"
                width={3}
                height={15}
              />
            </button>

            {isOpenMenu && (
              <div className="rounded-15 absolute top-full right-0 z-20 mt-8 flex w-[210px] flex-col overflow-hidden bg-[#FEFEFE] shadow-[0px_0px_10px_1px_rgba(0,0,0,0.05)]">
                <button
                  onClick={handleEdit}
                  className="text-body-1 text-gray-default flex w-full items-center justify-between px-20 py-12 hover:bg-gray-50"
                >
                  수정
                  <Image
                    src="/icons/edit.svg"
                    alt="edit"
                    width={22}
                    height={22}
                  />
                </button>
                <div className="mx-20 h-[1px] bg-[#EBEBEB]" />
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="text-body-1 text-gray-default flex w-full items-center justify-between px-20 py-12 hover:bg-gray-50"
                >
                  삭제
                  <Image
                    src="/icons/delete.svg"
                    alt="delete"
                    width={22}
                    height={22}
                  />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-1">
        <div className="flex items-center gap-10">
          {!item.isDefault && item.colorCode && (
            <div
              className="rounded-2 h-10 w-10 shrink-0"
              style={{ backgroundColor: item.colorCode }}
            />
          )}
          <h3 className="text-caption-1 text-gray-default text-[14px] leading-none">
            {item.title}
          </h3>
        </div>

        <p className="text-caption-2 text-gray-disabled leading-none">
          {item.linkCount}
        </p>
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
