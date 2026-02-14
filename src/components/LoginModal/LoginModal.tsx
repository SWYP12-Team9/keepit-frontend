'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog'
import Image from 'next/image'

interface LoginModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginModal({ isOpen, onOpenChange }: LoginModalProps) {
  const handleLogin = (provider: string) => {
    const targetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/${provider}`
    window.location.assign(targetUrl)
  }

  const loginProviders = [
    {
      name: 'kakao',
      label: '카카오 로그인',
      bgColor: 'bg-[#FEE500]',
      textColor: 'text-[#191919]',
      icon: '/icons/kakao.svg',
      iconSize: 40,
    },
    {
      name: 'naver',
      label: '네이버 로그인',
      bgColor: 'bg-[#03C75A]',
      textColor: 'text-white',
      icon: '/icons/naver.svg',
      iconSize: 20,
    },
    {
      name: 'google',
      label: '구글 로그인',
      bgColor: 'bg-[#F2F2F2]',
      textColor: 'text-[#191919]',
      icon: '/icons/google.svg',
      iconSize: 27,
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-32px)] max-w-[440px] rounded-[24px] border-none bg-white p-24 shadow-2xl sm:p-40">
        <DialogHeader className="flex flex-col items-center space-y-16 sm:space-y-24">
          <div className="relative mb-4 h-48 w-[120px] sm:mb-8 sm:h-60 sm:w-[150px]">
            <Image
              src="/images/logo-keepit.png"
              alt="keepit logo"
              fill
              className="object-contain"
            />
          </div>
          <DialogTitle className="text-center text-[18px] leading-relaxed font-medium text-[#000000]">
            <br /> 로그인하고 링크에 담긴 아이디어를 킵잇하세요
          </DialogTitle>
        </DialogHeader>

        <div className="mt-32 h-[1px] w-full bg-[#E5E5E5]" />

        <div className="mt-32 flex flex-col gap-12">
          {loginProviders.map((provider) => (
            <button
              key={provider.name}
              onClick={() => handleLogin(provider.name)}
              className={`flex h-60 w-full items-center justify-center gap-12 rounded-[12px] ${provider.bgColor} transition-transform active:scale-[0.98]`}
            >
              <Image
                src={provider.icon}
                alt={provider.name}
                width={provider.iconSize}
                height={provider.iconSize}
              />
              <span className={`text-[16px] font-bold ${provider.textColor}`}>
                {provider.label}
              </span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
