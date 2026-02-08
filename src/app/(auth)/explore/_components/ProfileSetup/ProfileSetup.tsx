'use client'

import { usePostProfileMutation } from '@/src/apis/query/user/usePostUserProfile'
import { requestGetUserInfo } from '@/src/apis/request/requestGetUserInfo'
import { ProfileModal } from '@/src/components/Modal/ProfileModal'
import { useAuthStore } from '@/src/store/authStore'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FieldValues } from 'react-hook-form'

export function ProfileSetup() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isNewUser = searchParams.get('isNewUser') === 'true'

  const { mutate: postProfile } = usePostProfileMutation()
  const login = useAuthStore((state) => state.login)

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
        onSuccess: async () => {
          const { data: userInfo } = await requestGetUserInfo()
          login({
            userId: userInfo.userId,
            nickname: userInfo.nickname,
            profileImage: userInfo.profileImageUrl,
          })
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
