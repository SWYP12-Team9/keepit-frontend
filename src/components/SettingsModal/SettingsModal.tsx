'use client'

import { useGetUserInfo } from '@/src/apis/query/user/useGetUserInfo'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog'
import { useSettingsModalStore } from '@/src/store/settingsModalStore'
import { cn } from '@/src/utils/cn'
import Image from 'next/image'
import Link from 'next/link'

export function SettingsModal() {
  const { isOpen, close } = useSettingsModalStore()
  const { data: userInfo } = useGetUserInfo()

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[calc(100%-32px)] max-w-[560px] rounded-[24px] border-none bg-white p-24 shadow-2xl sm:p-40">
        <DialogHeader>
          <DialogTitle className="text-center text-[20px] font-bold text-black">
            설정
          </DialogTitle>
        </DialogHeader>

        <div className="mt-40 flex flex-col items-center">
          {/* User Info Box */}
          <div className="flex w-full items-center justify-between rounded-[20px] border border-[#6B4BFB33] bg-[#6B4BFB08] p-24">
            <div className="flex items-center gap-16">
              <div className="relative h-64 w-64 overflow-hidden rounded-full border border-gray-100 bg-gray-50">
                <Image
                  src={
                    userInfo?.data.profileImageUrl ||
                    '/images/defaultProfile.png'
                  }
                  alt="프로필"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[18px] font-bold text-gray-900">
                  {userInfo?.data.nickname || '유저'}
                </span>
                <span className="text-[14px] text-gray-500">
                  {/* Email is not provided by API, using a placeholder as in the image */}
                  keepit@gmail.com
                </span>
              </div>
            </div>

            <div className="flex items-center gap-12">
              <div className="h-32 w-[1px] bg-[#6B4BFB33]" />
              <div className="flex gap-8">
                {[
                  {
                    name: 'kakao',
                    bgColor: 'bg-[#FEE500]',
                    icon: '/icons/kakao.svg',
                    size: 'h-40 w-40',
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
                ].map((social) => (
                  <div
                    key={social.name}
                    className={cn(
                      'flex items-center justify-center overflow-hidden rounded-full shadow-sm',
                      social.size,
                      social.bgColor,
                    )}
                  >
                    <div className={cn('relative', social.imageSize)}>
                      <Image
                        src={social.icon}
                        alt={social.name}
                        fill
                        className={cn('object-contain', social.padding)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="mt-32 flex items-center justify-center gap-20 text-[16px] font-medium text-gray-700">
            <Link href="/terms" className="hover:underline">
              서비스 이용약관
            </Link>
            <div className="h-16 w-[1px] bg-gray-300" />
            <Link href="/privacy" className="hover:underline">
              개인정보 처리방침
            </Link>
          </div>

          {/* Unsubscribe */}
          <button className="mt-40 text-[14px] font-normal text-gray-400 underline underline-offset-4 hover:text-gray-600">
            회원 탈퇴
          </button>

          {/* Done Button */}
          <button
            onClick={close}
            className="mt-40 h-56 w-160 rounded-[12px] bg-[#6B4BFB] text-[18px] font-bold text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            완료
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
