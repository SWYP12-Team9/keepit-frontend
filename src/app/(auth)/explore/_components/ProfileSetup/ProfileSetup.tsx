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
  const { isLoggedIn, user } = useAuthStore()

  useEffect(() => {
    const isNewUser = searchParams.get('isNewUser') === 'true'
    const hasNicknameInStore = Boolean(user?.nickname?.trim())

    if (!isLoggedIn || pathname !== '/explore') return

    if (isNewUser) {
      open()
      return
    }

    // 기존 유저인데 이전 상태로 모달이 열려 있으면 정리
    if (isOpen && hasNicknameInStore) {
      close()
    }

    if (isOpen && !hasNicknameInStore) {
      close()
      return
    }
  }, [
    close,
    isLoggedIn,
    isOpen,
    open,
    pathname,
    router,
    searchParams,
    user?.nickname,
  ])

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

  const isLoginParam = searchParams.get('login') === 'true'

  if (pathname !== '/explore' || !isOpen || isLoginParam) return null

  return (
    <ProfileModal
      isModalOpen={isOpen}
      setModalOpen={close}
      onSubmit={handleProfileSubmit}
    />
  )
}
