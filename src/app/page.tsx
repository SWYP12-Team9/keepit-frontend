'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/src/utils/cn'
import { Button } from '@/src/components/ui/button'

export default function LandingPage() {
  const handleLogin = (provider: string) => {
    // Check if window is defined (client-side) to avoid SSR errors, though 'use client' handles this.
    if (typeof window !== 'undefined') {
      const targetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/${provider}`
      window.location.assign(targetUrl)
    }
  }

  const loginProviders = [
    {
      name: 'kakao',
      bgColor: 'bg-[#FEE500]',
      icon: '/icons/kakao.svg',
      size: 'h-40 w-40', // Slightly tweaked for header size if needed
      imageSize: 'h-40 w-40',
      padding: '',
    },
    {
      name: 'naver',
      bgColor: 'bg-[#03C75A]',
      icon: '/icons/naver.svg',
      size: 'h-40 w-40',
      imageSize: 'h-20 w-20',
      padding: 'p-[1px]',
    },
    {
      name: 'google',
      bgColor: 'bg-[#EEEEEE]',
      icon: '/icons/google.svg',
      size: 'h-40 w-40',
      imageSize: 'h-22 w-22',
      padding: 'p-[1px]',
    },
  ]

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-[#050505]">
      {/* Background Glow/Grid Effects could be added here if needed */}

      {/* Floating Header */}
      <nav className="fixed top-24 left-1/2 z-50 flex h-54 w-[calc(100%-48px)] max-w-[1240px] -translate-x-1/2 items-center justify-between rounded-full bg-white px-12 shadow-lg sm:px-24">
        {/* Left Section */}
        <div className="flex items-center gap-16 sm:gap-32">
          {/* Logo */}
          <Link href="/" className="relative h-50 w-130 min-w-[120px]">
            <Image
              src="/images/logo-keepit.png"
              alt="Keepit"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Nav Items - Hidden on mobile, visible on desktop could be better, but image shows them */}
          <div className="hidden items-center gap-24 md:flex">
            <Link href="/explore?login=true">
              <Button className="h-36 rounded-full bg-[#6B4BFB] px-20 text-[18px] font-medium text-white hover:bg-[#5a3de0]">
                탐색
              </Button>
            </Link>
            <Link
              href="#"
              className="text-[18px] font-normal text-[#4D4D4D] hover:text-black"
            >
              공지사항
            </Link>
            <Link
              href="#"
              className="text-[18px] font-normal text-[#4D4D4D] hover:text-black"
            >
              문의하기
            </Link>
            <Link
              href="#"
              className="text-[18px] font-normal text-[#4D4D4D] hover:text-black"
            >
              약관
            </Link>
          </div>
        </div>

        {/* Right Section - Social Login */}
        <div className="flex items-center gap-12 sm:gap-16">
          <span className="hidden text-[18px] font-normal text-[#4D4D4D] sm:block">
            간편 로그인
          </span>
          <div className="hidden h-16 w-[1px] bg-[#E5E5E5] sm:block" />

          <div className="flex gap-8">
            {loginProviders.map((social) => (
              <button
                key={social.name}
                onClick={() => handleLogin(social.name)}
                className={cn(
                  'flex items-center justify-center overflow-hidden rounded-full transition-transform active:scale-[0.92]',
                  social.size,
                  social.bgColor,
                )}
                aria-label={`${social.name} login`}
              >
                <div className={cn('relative', social.imageSize)}>
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
      </nav>

      {/* Main Content */}
      <main className="flex min-h-screen w-full flex-col items-center justify-center pt-[70px] text-center">
        {/* Main Visual - landing.svg */}
        <div className="relative -mt-80 flex w-full items-center justify-center overflow-hidden">
          <div className="w-full max-w-none">
            <Image
              src="/icons/landing.svg"
              alt="Keepit Dashboard Visual"
              width={1920}
              height={1080}
              className="h-auto w-full scale-105 object-cover" // Slightly scale up to ensure it covers properly
              priority
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 animate-bounce">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-50"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </main>
    </div>
  )
}
