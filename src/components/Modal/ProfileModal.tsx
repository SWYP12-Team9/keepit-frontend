import Image from 'next/image'
import { ChangeEvent, useRef } from 'react'
import { FieldValues, useForm, useWatch } from 'react-hook-form'
import { Button } from '../Button'
import { Modal } from './Modal'
import { ProfileField } from './ProfileField'

interface ProfileModalProps {
  isModalOpen: boolean
  setModalOpen: (isModalOpen: boolean) => void
  onSubmit: (data: FieldValues) => void
  initialData?: {
    nickname: string
    introduction: string
    profileImageUrl: string
    backgroundImageUrl: string
  }
}

export function ProfileModal({
  isModalOpen,
  onSubmit,
  initialData,
}: ProfileModalProps) {
  const DEFAULT_PROFILE = '/images/defaultProfile.png'
  const DEFAULT_BG = '/images/defaultBackground.png'
  const isEditMode = !!initialData?.nickname

  const profileInputRef = useRef<HTMLInputElement>(null)
  const bgInputRef = useRef<HTMLInputElement>(null)

  const { control, register, handleSubmit, setValue } = useForm({
    defaultValues: {
      nickname: initialData?.nickname || '',
      introduction: initialData?.introduction || '',
      profileImageUrl: initialData?.profileImageUrl || DEFAULT_PROFILE,
      backgroundImageUrl: initialData?.backgroundImageUrl || DEFAULT_BG,
    },
  })

  const nicknameValue = useWatch({ control, name: 'nickname' }) || ''
  const introValue = useWatch({ control, name: 'introduction' }) || ''
  const profileImageUrl = useWatch({ control, name: 'profileImageUrl' })
  const backgroundImageUrl = useWatch({ control, name: 'backgroundImageUrl' })

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: 'profileImageUrl' | 'backgroundImageUrl',
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    const imageUrl = URL.createObjectURL(file)
    setValue(field, imageUrl)
  }

  return (
    <Modal
      isOpen={isModalOpen}
      width="w-[852px]"
      className="flex flex-col items-center px-[102px] pt-48 pb-32"
    >
      <div className="mb-28 text-center">
        {isEditMode ? (
          <h2 className="text-heading-3">프로필 수정</h2>
        ) : (
          <h2 className="text-heading-3">
            킵잇에 오신 것을 환영해요! 🎉
            <br />
            프로필을 간단히 만들어볼까요?
          </h2>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
        <div className="rounded-12 bg-blue-light p-24 pb-20">
          <div className="rounded-12 relative h-140 w-full overflow-hidden bg-[#C5C8E1]">
            <Image
              src={backgroundImageUrl}
              alt="Background"
              fill
              sizes="100vw"
              className="object-cover"
            />

            <input
              ref={bgInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, 'backgroundImageUrl')}
            />

            <button
              type="button"
              onClick={() => bgInputRef.current?.click()}
              className="text-body-3 absolute right-12 bottom-12 z-10 flex items-center gap-6 rounded-[999px] bg-black/40 px-12 py-6 text-white backdrop-blur-sm"
            >
              <Image
                src="/icons/white-camera.svg"
                alt="camera"
                width={16}
                height={16}
              />
              배경 편집
            </button>
          </div>

          <div className="relative -mt-40 ml-24 flex flex-col items-start gap-8">
            <div className="ml-10">
              <div className="relative h-80 w-80">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-white">
                  <Image
                    src={profileImageUrl}
                    alt="Profile"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <input
                  ref={profileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, 'profileImageUrl')}
                />

                <button
                  type="button"
                  onClick={() => profileInputRef.current?.click()}
                  className="absolute right-0 bottom-0 z-20 flex h-24 w-24 items-center justify-center rounded-full transition-transform active:scale-90"
                >
                  <Image
                    src="/icons/circle-camera.svg"
                    alt="camera"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setValue('profileImageUrl', DEFAULT_PROFILE)}
              className="text-body-3 text-blue-normal ml-4 hover:underline"
            >
              기본 이미지로 설정
            </button>
          </div>

          <div className="mt-20 flex flex-col gap-20 px-24">
            <ProfileField
              label="닉네임"
              required
              currentLength={nicknameValue.length}
              maxLength={10}
              placeholder="별명이나 활동명을 입력하세요"
              registerProps={register('nickname', {
                required: true,
                maxLength: 10,
              })}
              width="w-[256px]"
            />

            <ProfileField
              label="한 줄 소개"
              currentLength={introValue.length}
              maxLength={40}
              placeholder="나를 한 문장으로 소개해 주세요"
              registerProps={register('introduction', { maxLength: 40 })}
            />
          </div>
        </div>

        <div className="mt-24 flex justify-center">
          <Button
            variant="tertiary"
            width="w-140"
            height="h-[38px]"
            className="text-gray-white"
            type="submit"
          >
            완료
          </Button>
        </div>
      </form>
    </Modal>
  )
}
