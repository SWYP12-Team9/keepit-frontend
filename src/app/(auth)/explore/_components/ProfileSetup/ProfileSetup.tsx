'use client'

import { usePostProfileMutation } from '@/src/apis/query/user/usePostUserProfile'
import { requestGetUserInfo } from '@/src/apis/request/requestGetUserInfo'
import {
  ProfileFormData,
  ProfileModal,
} from '@/src/components/Modal/ProfileModal'
import { useAuthStore } from '@/src/store/authStore'
import { useProfileSetupStore } from '@/src/store/profileSetupStore'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function ProfileSetup() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const { isOpen, open, close } = useProfileSetupStore()

  useEffect(() => {
    const isNewUser = searchParams.get('isNewUser') === 'true'
    if (isNewUser) {
      open()
    }
  }, [searchParams, open])

  const { mutate: postProfile } = usePostProfileMutation()
  const login = useAuthStore((state) => state.login)

  const handleProfileSubmit = (data: ProfileFormData) => {
    postProfile(
      {
        profile: data.profile,
        profileImage: data.profileImage,
        backgroundImage: data.backgroundImage,
      },
      {
        onSuccess: async () => {
          const { data: userInfo } = await requestGetUserInfo()
          login({
            userId: userInfo.userId,
            nickname: userInfo.nickname,
            profileImage: userInfo.profileImageUrl,
          })

          close()

          if (searchParams.get('isNewUser')) {
            router.replace(pathname)
          }
        },
      },
    )
  }

  if (!isOpen) return null

  return (
    <ProfileModal
      isModalOpen={isOpen}
      setModalOpen={close}
      onSubmit={handleProfileSubmit}
    />
  )
}
