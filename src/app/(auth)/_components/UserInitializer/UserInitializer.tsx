'use client'

import { requestGetUserInfo } from '@/src/apis/request/requestGetUserInfo'
import { useAuthStore } from '@/src/store/authStore'
import { useEffect } from 'react'

export function UserInitializer() {
  const { isLoggedIn, login, logout } = useAuthStore()

  useEffect(() => {
    const initUser = async () => {
      const hasToken = localStorage.getItem('accessToken')
      if (!hasToken || isLoggedIn) return

      try {
        const { data } = await requestGetUserInfo()

        login({
          userId: data.userId,
          nickname: data.nickname,
          profileImage: data.profileImageUrl,
        })
      } catch (error) {
        console.log(error)
      }
    }

    initUser()
  }, [isLoggedIn, login, logout])

  return null
}
