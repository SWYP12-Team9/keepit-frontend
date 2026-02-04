import { Controller, useForm } from 'react-hook-form'
import { Button } from '../Button'
import { Modal } from './Modal'
import { Dropdown } from '../Dropdown'
import { useGetReferenceList } from '@/src/apis/query/reference/useGetReferenceList'
import { ReferenceItem } from '@/src/types/reference/reference'
import { MoveLinkFormData } from './types'
import { usePatchLinkMutation } from '@/src/apis/query/link/usePatchLinkMutation'
import { useDrawerStore } from '@/src/store/drawerStore'

interface MoveLinkModalProps {
  isModalOpen: boolean
  onClose: () => void
  linkId: number | null
}

export function MoveLinkModal({
  isModalOpen,
  onClose,
  linkId,
}: MoveLinkModalProps) {
  const why = useDrawerStore((state) => state.why)
  const memo = useDrawerStore((state) => state.memo)
  const initialWhy = useDrawerStore((state) => state.initialWhy)
  const initialMemo = useDrawerStore((state) => state.initialMemo)

  const closeDrawer = useDrawerStore((state) => state.close)

  const { data: referenceList } = useGetReferenceList({ type: 'all' })
  const { mutateAsync: patchLink } = usePatchLinkMutation()

  const dropdownOptions = referenceList?.data?.contents.map(
    (item: ReferenceItem) => ({
      id: item.id,
      title: item.title,
    }),
  )

  const { reset, control, handleSubmit } = useForm<MoveLinkFormData>({
    defaultValues: {
      selectedFolder: null,
    },
  })

  const onSubmit = async (data: MoveLinkFormData) => {
    const body: {
      why?: string
      memo?: string
      referenceId?: number
      moveToDefault?: boolean
    } = {}

    if (why !== initialWhy) body.why = why
    if (memo !== initialMemo) body.memo = memo

    const selectedFolder = data.selectedFolder

    if (selectedFolder) {
      const isSameFolder = selectedFolder.id === linkId
      const isDefaultFolder = selectedFolder.title === '미지정'

      if (!isSameFolder) {
        if (isDefaultFolder) {
          body.moveToDefault = true
        } else {
          body.referenceId = selectedFolder.id as number
        }
      }
    }

    if (Object.keys(body).length === 0) {
      alert('변경된 내용이 없습니다.')
      return
    }

    await patchLink({
      userLinkId: linkId as number,
      body,
    })

    closeDrawer()
    onClose()
    reset()
  }

  return (
    <Modal isOpen={isModalOpen} width="w-400" className="flex flex-col gap-20">
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
            />
          )}
        />
      </div>

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
