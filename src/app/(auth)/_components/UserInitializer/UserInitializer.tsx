'use client'

import { requestGetUserInfo } from '@/src/apis/request/requestGetUserInfo'
import { useAuthStore } from '@/src/store/authStore'
import { AxiosError } from 'axios'
import { useEffect } from 'react'

export function UserInitializer() {
  const { isLoggedIn, login, logout } = useAuthStore()

  useEffect(() => {
    const initUser = async () => {
      const hasToken = localStorage.getItem('accessToken')
      if (!hasToken || isLoggedIn) return

      try {
        let userInfo = null

        for (let attempt = 0; attempt < 3; attempt += 1) {
          try {
            userInfo = await requestGetUserInfo()
            break
          } catch (error) {
            const status = (error as AxiosError)?.response?.status
            if (status !== 403 || attempt === 2) throw error
            await new Promise((resolve) =>
              setTimeout(resolve, 200 * (attempt + 1)),
            )
          }
        }

        if (!userInfo) return
        const { data } = userInfo

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
