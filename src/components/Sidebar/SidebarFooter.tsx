'use client'

import { useLogout } from '@/src/apis/query/auth/useLogout'
import { useAuthStore } from '@/src/store/authStore'
import { cn } from '@/src/utils/cn'
import Image from 'next/image'
import { useState } from 'react'
import { NavLogout, NavSetting } from '../Icon'
import { ConfirmModal } from '../Modal/ConfirmModal'
import { SettingsModal } from '../Modal/SettingModal'

export function SidebarFooter({ isExpanded }: { isExpanded: boolean }) {
  const { isLoggedIn } = useAuthStore()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

  const loginProviders = [
    {
      name: 'kakao',
      icon: '/icons/kakao.svg',
    },
  ]

  const handleLogin = (provider: string) => {
    const targetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/${provider}`
    window.location.assign(targetUrl)
  }

  const { mutate: logout } = useLogout()
  const handleConfirmLogout = () => {
    logout()
    setIsLogoutModalOpen(false)
  }

  if (!isLoggedIn) {
    return (
      <div className="mt-auto flex w-full flex-col items-center px-[20px] pt-60 pb-50">
        <span className="text-body-2 text-gray-disabled mb-8">간편 로그인</span>

        <div className="mb-12 h-[1px] w-full bg-black/16" />

        {loginProviders.map((social) => (
          <button
            key={social.name}
            onClick={() => handleLogin(social.name)}
            className="flex h-44 w-44 items-center justify-center rounded-full"
            aria-label={`${social.name} login`}
          >
            <Image src={social.icon} alt={social.name} width={44} height={44} />
          </button>
        ))}
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
          onClick={() => setIsSettingsModalOpen(true)}
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
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
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
