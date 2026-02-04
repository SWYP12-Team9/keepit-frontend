import { useAuthStore } from '@/src/store/authStore'
import { cn } from '@/src/utils/cn'
import Image from 'next/image'
import Link from 'next/link'

export default function SidebarProfile({
  isExpanded,
}: {
  isExpanded: boolean
}) {
  const { isLoggedIn, user } = useAuthStore()

  return (
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
              : '/images/logout-profile.png'
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
              {user.name}님
            </span>
          ) : (
            <Link href="/login" className="text-body-3 text-gray-default">
              로그인이 필요합니다
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
