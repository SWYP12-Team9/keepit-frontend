import { useAuthStore } from '@/src/store/authStore'
import { cn } from '@/src/utils/cn'
import Image from 'next/image'
import { useState } from 'react'
import { LoginModal } from '../Modal/LoginModal'

export default function SidebarProfile({
  isExpanded,
}: {
  isExpanded: boolean
}) {
  const { isLoggedIn, user } = useAuthStore()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <>
      <div
        className={cn(
          'mt-17 mb-20 flex shrink-0 items-center transition-all',
          isExpanded ? 'ml-20 gap-8' : 'mt-[22px] justify-center',
        )}
      >
        <div className="relative h-[30px] w-[30px] overflow-hidden rounded-full border border-gray-100 shadow-sm">
          <Image
            src={
              isLoggedIn && user?.profileImage
                ? user.profileImage
                : '/images/defaultProfile.png'
            }
            alt="profile"
            fill
            className="object-cover"
          />
        </div>

        {isExpanded && (
          <div className="animate-in fade-in duration-300">
            {isLoggedIn && user ? (
              <span className="text-body-3 text-gray-default font-medium">
                {user.nickname}님
              </span>
            ) : isLoggedIn ? (
              <span className="text-body-3 text-gray-default">
                회원 정보 설정 중
              </span>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-body-3 text-gray-default cursor-pointer"
              >
                로그인이 필요합니다
              </button>
            )}
          </div>
        )}
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onOpenChange={setIsLoginModalOpen}
      />
    </>
  )
}
