import { Modal } from './Modal'
import { FolderVisibleTab } from './FolderVisibleTab'
import { Input } from '../Input'
import { ColorPicker } from '../ColorPicker'
import { COLOR_OPTIONS } from '@/src/constants/colorOptions'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { TextArea } from '../TextArea'
import { Button } from '../Button'

interface CreateFolderModalProps {
  isModalOpen: boolean
  setModalOpen: (isModalOpen: boolean) => void
  onSubmit: (data: FieldValues) => void
}

export function CreateFolderModal({
  isModalOpen,
  setModalOpen,
  onSubmit,
}: CreateFolderModalProps) {
  const { reset, control, register, handleSubmit } = useForm({
    defaultValues: {
      isPublic: true,
      title: '',
      colorCode: '',
      description: '',
    },
  })

  return (
    <Modal isOpen={isModalOpen} width="w-400" className="flex flex-col gap-20">
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
  )
}
