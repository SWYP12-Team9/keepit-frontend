'use client'

import { useJwtExchangeMutation } from '@/src/apis/query/auth/useJwtExchange'
import { requestGetUserInfoWithToken } from '@/src/apis/request/requestGetUserInfo'
import { useAuthStore } from '@/src/store/authStore'
import { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function CookiePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isNewUser = searchParams.get('isNewUser') === 'true'

  const { login, logout, setLoggedIn } = useAuthStore()
  const { mutate: exchangeToken } = useJwtExchangeMutation()

  useEffect(() => {
    exchangeToken(undefined, {
      onSuccess: async (tokenData) => {
        localStorage.setItem('accessToken', tokenData.accessToken)
        localStorage.setItem('refreshToken', tokenData.refreshToken)

        try {
          const fetchUserInfo = async () => {
            let lastError: unknown
            for (let attempt = 0; attempt < 5; attempt += 1) {
              try {
                return await requestGetUserInfoWithToken(tokenData.accessToken)
              } catch (error) {
                lastError = error
                const status = (error as AxiosError)?.response?.status
                if (status !== 403) throw error

                await new Promise((resolve) =>
                  setTimeout(resolve, 250 * (attempt + 1)),
                )
              }
            }

            throw lastError
          }

          // 신규/기존 유저 상관없이 무조건 유저 정보 가져오기
          const { data } = await fetchUserInfo()
          const hasNickname = data.nickname.trim().length > 0

          login({
            userId: data.userId,
            nickname: data.nickname,
            profileImage: data.profileImageUrl,
          })

          // 쿼리 파라미터만 신뢰하지 않고 실제 유저 데이터로 한번 더 검증
          if (isNewUser && !hasNickname) {
            router.replace('/explore?isNewUser=true')
          } else {
            router.replace('/explore')
          }
        } catch (error) {
          const axiosError = error as AxiosError<{ code?: string }>
          const status = axiosError.response?.status
          const code = axiosError.response?.data?.code

          // 신규 유저의 프로필 미완성 상태(USR007)는 로그인 성공으로 처리하고 프로필 설정으로 보냄
          if (status === 403 && code === 'USR007') {
            setLoggedIn(true)
            router.replace('/explore?isNewUser=true')
            return
          }

          console.error('유저 정보 로드 실패', error)
          logout()
          router.replace('/explore?login=true')
        }
      },
      onError: (error) => {
        console.error('토큰 교환 중 에러 발생:', error)
      },
    })
  }, [exchangeToken, isNewUser, router, login, logout, setLoggedIn])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="mb-2 text-lg font-medium">
          로그인 정보를 확인 중입니다...
        </p>
        <p className="text-sm text-gray-500">잠시만 기다려 주세요.</p>
      </div>
    </div>
  )
}
