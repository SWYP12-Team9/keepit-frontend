import { Controller, useForm, useWatch } from 'react-hook-form'
import { Button } from '../Button'
import { Modal } from './Modal'
import { ColorPicker } from '../ColorPicker'
import { COLOR_OPTIONS } from '@/src/constants/colorOptions'
import { Dropdown } from '../Dropdown'
import { useGetReferenceList } from '@/src/apis/query/reference/useGetReferenceList'
import { ReferenceItem } from '@/src/types/reference/reference'
import { Input } from '../Input'
import { MoveLinkFormData } from './types'

interface MoveLinkModalProps {
  isModalOpen: boolean
  onClose: () => void
}

export function MoveLinkModal({ isModalOpen, onClose }: MoveLinkModalProps) {
  const { data: referenceList } = useGetReferenceList({ type: 'all' })

  const dropdownOptions = referenceList?.data?.contents.map(
    (item: ReferenceItem) => ({
      id: item.id,
      title: item.title,
    }),
  )

  const { reset, control, register, handleSubmit } = useForm<MoveLinkFormData>({
    defaultValues: {
      newFolder: '',
      colorCode: '',
      selectedFolder: null,
    },
  })

  const selectedFolder = useWatch({
    control,
    name: 'selectedFolder',
  })

  const isCreateMode = selectedFolder?.id === 'create-folder'

  const onSubmit = (data: MoveLinkFormData) => {
    console.log(data)
  }

  return (
    <Modal isOpen={isModalOpen} width="w-400" className="flex flex-col gap-20">
      {/* 기존 레퍼런스 폴더 선택 */}
      <div className="flex flex-col gap-12">
        <label className="text-body-1 text-gray-default">
          레퍼런스 폴더 이동
        </label>

        <Controller
          name="selectedFolder"
          control={control}
          render={({ field }) => (
            <Dropdown
              options={dropdownOptions}
              value={field.value}
              onChange={field.onChange}
              placeholder="레퍼런스 폴더를 선택해주세요"
              footerButton={(close) => (
                <button
                  onClick={() => {
                    close()
                    field.onChange({
                      id: 'create-folder',
                      title: '레퍼런스 폴더 생성',
                    })
                  }}
                  className="text-caption-1 rounded-8 text-gray-muted hover:bg-gray-muted w-full px-20 py-11 text-left transition-colors hover:text-black"
                >
                  새로운 폴더 추가
                </button>
              )}
            />
          )}
        />
      </div>

      {isCreateMode && (
        <>
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

          {/* 추가할 레퍼런스 폴더명 */}
          <div className="flex flex-col gap-12">
            <label className="text-body-1 text-gray-default">
              레퍼런스 이름
            </label>
            <Input
              placeholder="레퍼런스 폴더 이름을 입력해 주세요"
              {...register('newFolder')}
            />
          </div>
        </>
      )}

      <div className="mt-14 flex justify-end gap-20">
        <Button
          onClick={onClose}
          width="w-85"
          height="h-42"
          variant="secondary"
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
