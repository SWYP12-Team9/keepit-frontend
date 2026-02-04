'use client'

import { useAuthStore } from '@/src/store/authStore'
import { cn } from '@/src/utils/cn'
import Image from 'next/image'
import Link from 'next/link'
import { NavLogout, NavSetting } from '../Icon'

export function SidebarFooter({ isExpanded }: { isExpanded: boolean }) {
  const { isLoggedIn } = useAuthStore()

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
    <div
      className={cn(
        'mt-24 mt-auto flex w-full items-center pr-[20px]',
        isExpanded ? 'justify-end gap-4' : 'flex-col justify-center gap-8 pr-0',
      )}
    >
      <Link
        href="/settings"
        className="flex h-40 w-40 items-center justify-center"
      >
        <NavSetting className="h-full w-full" />
      </Link>
      <Link
        href="/logout"
        className="flex h-40 w-40 items-center justify-center"
      >
        <NavLogout className="h-full w-full" />
      </Link>
    </div>
  )
}
