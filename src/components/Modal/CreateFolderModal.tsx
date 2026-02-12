import { COLOR_OPTIONS } from '@/src/constants/colorOptions'
import { createFolderSchema } from '@/src/schemas/saveLinkFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { Button } from '../Button'
import { ColorPicker } from '../ColorPicker'
import { Input } from '../Input'
import { TextArea } from '../TextArea'
import { FolderVisibleTab } from './FolderVisibleTab'
import { Modal } from './Modal'

interface CreateFolderModalProps {
  isModalOpen: boolean
  setModalOpen: (isModalOpen: boolean) => void
  onSubmit: (data: FieldValues) => void
  initialData?: FieldValues | null
}

export function CreateFolderModal({
  isModalOpen,
  setModalOpen,
  onSubmit,
  initialData,
}: CreateFolderModalProps) {
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      isPublic: true,
      title: '',
      colorCode: '',
      description: '',
    },
  })

  useEffect(() => {
    if (initialData && isModalOpen) {
      reset(initialData)
    }
  }, [initialData, isModalOpen, reset])

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal
        isOpen={isModalOpen}
        width="w-400"
        className="flex flex-col gap-20"
      >
        {/* 폴더 공개 여부 */}
        <Controller
          name="isPublic"
          control={control}
          render={({ field }) => (
            <FolderVisibleTab
              isPublic={field.value}
              setIsPublic={field.onChange}
            />
          )}
        />

        {/* 레퍼런스 폴더 이름 */}
        <div className="flex flex-col gap-12">
          <label className="text-body-1 text-gray-default">레퍼런스 이름</label>
          <Input
            placeholder="레퍼런스 폴더 이름을 입력해 주세요"
            className="py-16"
            {...register('title')}
          />
        </div>

        {/* 색상 선택 */}
        <div className="flex flex-col gap-12">
          <label className="text-body-1 text-gray-default">색상 선택</label>
          <Controller
            name="colorCode"
            control={control}
            render={({ field }) => (
              <ColorPicker
                colorOptions={COLOR_OPTIONS}
                color={field.value}
                setColor={field.onChange}
              />
            )}
          />
          {errors.colorCode && (
            <p className="text-caption-1 text-red-500">
              {errors.colorCode.message}
            </p>
          )}
        </div>

        {/* 메모 */}
        <div className="flex flex-col gap-12">
          <label className="text-body-1 text-gray-default">메모</label>
          <TextArea
            height="h-130"
            placeholder="메모를 입력하세요(선택)"
            {...register('description')}
          />
        </div>

        <div className="mt-auto flex justify-end gap-20">
          <Button
            width="w-85"
            height="h-42"
            variant="secondary"
            onClick={() => {
              setModalOpen(false)
              reset()
            }}
          >
            취소
          </Button>
          <Button width="w-130" height="h-42" onClick={handleSubmit(onSubmit)}>
            저장
          </Button>
        </div>
      </Modal>
    </div>
  )
}
