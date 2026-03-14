'use client'

import { useLogout } from '@/src/apis/query/auth/useLogout'
import { useAuthStore } from '@/src/store/authStore'
import { cn } from '@/src/utils/cn'
import Image from 'next/image'
import { useState } from 'react'
import { NavLogout, NavSetting } from '../Icon'
import { ConfirmModal } from '../Modal/ConfirmModal'
import { SettingModal } from '../Modal/SettingModal'

export function SidebarFooter({ isExpanded }: { isExpanded: boolean }) {
  const { isLoggedIn } = useAuthStore()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false)

  const handleLogin = (provider: string) => {
    const targetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/${provider}`
    window.location.assign(targetUrl)
  }

  const { mutate: logout } = useLogout()
  const handleConfirmLogout = () => {
    logout()
    setIsLogoutModalOpen(false)
  }

  const loginProviders = [
    {
      name: 'kakao',
      bgColor: 'bg-[#FEE500]',
      icon: '/icons/kakao.svg',
      size: 'h-44 w-44',
      padding: '',
    },
    {
      name: 'naver',
      bgColor: 'bg-[#03C75A]',
      icon: '/icons/naver.svg',
      size: 'h-21 w-21',
      padding: 'p-[1px]',
    },
    {
      name: 'google',
      bgColor: 'bg-[#EEEEEE]',
      icon: '/icons/google.svg',
      size: 'h-24 w-24',
      padding: 'p-[1px]',
    },
  ]

  if (!isLoggedIn) {
    return (
      <div className="mt-auto flex w-full flex-col items-center px-[20px] pt-60 pb-50">
        <span className="text-body-4 mb-12 text-[#5f5e5b]">간편 로그인</span>

        <div className="mb-16 h-[1px] w-full bg-[#E5E5E5]" />

        <div className="flex gap-12">
          {loginProviders.map((social) => (
            <button
              key={social.name}
              onClick={() => handleLogin(social.name)}
              className={cn(
                'flex h-44 w-44 items-center justify-center overflow-hidden rounded-full transition-transform active:scale-[0.92]',
                social.bgColor,
              )}
              aria-label={`${social.name} login`}
            >
              <div className={cn('relative', social.size)}>
                <Image
                  src={social.icon}
                  alt={social.name}
                  fill
                  className={cn('object-contain', social.padding)}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className={cn(
          'mt-24 mt-auto flex w-full items-center pr-[20px]',
          isExpanded
            ? 'justify-end gap-4'
            : 'flex-col justify-center gap-8 pr-0',
        )}
      >
        <button
          onClick={() => setIsSettingModalOpen(true)}
          className="flex h-40 w-40 cursor-pointer items-center justify-center"
          aria-label="settings"
        >
          <NavSetting className="h-full w-full" />
        </button>
        <button
          type="button"
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex h-40 w-40 cursor-pointer items-center justify-center"
          aria-label="logout"
        >
          <NavLogout className="h-full w-full" />
        </button>
      </div>
      <SettingModal
        isOpen={isSettingModalOpen}
        onClose={() => setIsSettingModalOpen(false)}
      />
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        title="로그아웃"
        description="로그아웃하고 다른 아이디로 로그인하기"
        confirmText="네"
        cancelText="아니요"
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  )
}
