'use client'

import { useJwtExchangeMutation } from '@/src/apis/query/auth/useJwtExchange'
import { requestGetUserInfo } from '@/src/apis/request/requestGetUserInfo'
import { useAuthStore } from '@/src/store/authStore'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function CookiePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isNewUser = searchParams.get('isNewUser') === 'true'

  const { login } = useAuthStore()
  const { mutate: exchangeToken } = useJwtExchangeMutation()

  useEffect(() => {
    exchangeToken(undefined, {
      onSuccess: async () => {
        try {
          // 신규/기존 유저 상관없이 무조건 유저 정보 가져오기
          const { data } = await requestGetUserInfo()
          login({
            userId: data.userId,
            nickname: data.nickname,
            profileImage: data.profileImageUrl,
          })

          // 신규 유저면 프로필 설정 페이지로
          if (isNewUser) {
            router.replace('/explore?isNewUser=true')
          } else {
            router.replace('/explore')
          }
        } catch (error) {
          console.error('유저 정보 로드 실패', error)
          router.replace('/explore')
        }
      },
      onError: (error) => {
        console.error('토큰 교환 중 에러 발생:', error)
      },
    })
  }, [exchangeToken, isNewUser, router, login])

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
