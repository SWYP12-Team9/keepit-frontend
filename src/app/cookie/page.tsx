'use client'

import { useJwtExchangeMutation } from '@/src/apis/query/auth/useJwtExchange'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function CookiePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isNewUser = searchParams.get('isNewUser') === 'true'

  const { mutate: exchangeToken } = useJwtExchangeMutation()

  useEffect(() => {
    exchangeToken(undefined, {
      onSuccess: (data) => {
        console.log('토큰 교환 성공:', data)

        if (isNewUser) {
          router.replace('/explore?isNewUser=true')
        } else {
          router.replace('/')
        }
      },
      onError: (error) => {
        console.error('토큰 교환 중 에러 발생 (502/401):', error)
      },
    })
  }, [exchangeToken, isNewUser, router])

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
