'use client'

import { Button } from '@/src/components/Button'
import { ColorPicker } from '@/src/components/ColorPicker'
import { Dropdown } from '@/src/components/Dropdown'
import { Input } from '@/src/components/Input'
import { Modal } from '@/src/components/Modal'
import { TextArea } from '@/src/components/TextArea'
import { COLOR_OPTIONS } from '@/src/constants/colorOptions'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { SaveLinkFormData } from './types'
import { useSaveLinkModalStore } from '@/src/store/saveLinkModalStore'
import { useGetReferenceList } from '@/src/apis/query/reference/useGetReferenceList'
import { ReferenceItem } from '@/src/types/reference/reference'
import { useEffect } from 'react'
import { useSaveLinkMutation } from '@/src/apis/query/link/useSaveLinkMutation'
import { buildSaveLinkPayload } from '@/src/utils/buildSaveLinkPayload'
import {
  saveLinkFormSchema,
  saveLinkRequestSchema,
} from '@/src/schemas/saveLinkFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'

export function SaveLinkModal() {
  const isModalOpen = useSaveLinkModalStore((state) => state.isOpen)
  const close = useSaveLinkModalStore((state) => state.close)
  const urlValue = useSaveLinkModalStore((state) => state.url)

  const { mutateAsync: saveLink } = useSaveLinkMutation()
  const { data: referenceList } = useGetReferenceList({ type: 'all' })

  const dropdownOptions = referenceList?.data?.contents.map(
    (item: ReferenceItem) => ({
      id: item.id,
      title: item.title,
    }),
  )

  const {
    reset,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SaveLinkFormData>({
    defaultValues: {
      why: '',
      url: '',
      selectedFolder: null,
      newFolder: '',
      colorCode: '',
      memo: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(saveLinkFormSchema),
  })

  useEffect(() => {
    if (isModalOpen) setValue('url', urlValue)
  }, [isModalOpen, urlValue])

  const selectedFolder = useWatch({
    control,
    name: 'selectedFolder',
  })

  const isCreateMode = selectedFolder?.id === 'create-folder'

  const onSubmit = async (data: SaveLinkFormData) => {
    const payload = buildSaveLinkPayload(data)
    const validatedPayload = saveLinkRequestSchema.safeParse(payload)

    if (validatedPayload.success) {
      await saveLink(validatedPayload.data)
    }

    close()
    reset()
  }

  return (
    <Modal isOpen={isModalOpen} width="w-400" className="flex flex-col gap-20">
      {/* 링크 저장 이유 */}
      <div className="flex flex-col gap-12">
        <label className="text-body-1 text-gray-default">이유</label>
        <Input placeholder="저장한 이유를 입력해 주세요" {...register('why')} />
      </div>

      {/* 링크 url */}
      <div className="flex flex-col gap-12">
        <label className="text-body-1 text-gray-default">링크</label>
        <Input placeholder="링크를 입력해 주세요" {...register('url')} />
        {errors.url && (
          <p className="text-caption-1 text-red-500">{errors.url.message}</p>
        )}
      </div>

      {/* 레퍼런스 폴더 선택 */}
      <div className="flex flex-col gap-12">
        <label className="text-body-1 text-gray-default">
          레퍼런스 폴더 선택
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
          {/* 레퍼런스 폴더 생성 */}
          <div className="flex flex-col gap-12">
            <label className="text-body-1 text-gray-default">
              레퍼런스 이름
            </label>
            <Input
              placeholder="레퍼런스 폴더 이름을 입력해 주세요"
              {...register('newFolder')}
            />
            {errors.newFolder && (
              <p className="text-caption-1 text-red-500">
                {errors.newFolder.message}
              </p>
            )}
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
        </>
      )}

      {/* 메모 */}
      <div className="flex flex-col gap-12">
        <label className="text-body-1 text-gray-default">메모</label>
        <TextArea
          height="h-130"
          placeholder="메모를 입력하세요(선택)"
          {...register('memo')}
        />
        {errors.memo && (
          <p className="text-caption-1 text-red-500">{errors.memo.message}</p>
        )}
      </div>

      <div className="mt-10 flex justify-end gap-20">
        <Button
          width="w-85"
          height="h-42"
          variant="secondary"
          onClick={() => {
            close()
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
