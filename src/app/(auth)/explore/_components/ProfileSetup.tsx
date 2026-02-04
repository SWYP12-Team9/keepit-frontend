'use client'

import { usePostProfileMutation } from '@/src/apis/query/user/usePostUserProfile'
import { ProfileModal } from '@/src/components/Modal/ProfileModal'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FieldValues } from 'react-hook-form'

export function ProfileSetup() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isNewUser = searchParams.get('isNewUser') === 'true'

  const { mutate: postProfile } = usePostProfileMutation()

  const handleProfileSubmit = (data: FieldValues) => {
    postProfile(
      {
        profile: {
          nickname: data.nickname,
          introduction: data.introduction,
        },
        profileImage: data.profileFile,
        backgroundImage: data.backgroundFile,
      },
      {
        onSuccess: () => {
          router.replace(pathname)
        },
      },
    )
  }

  if (!isNewUser) return null

  return (
    <ProfileModal
      isModalOpen={isNewUser}
      setModalOpen={() => router.replace(pathname)}
      onSubmit={handleProfileSubmit}
    />
  )
}
