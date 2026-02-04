import { cn } from '@/src/utils/cn'
import Image from 'next/image'

export default function SidebarProfile({
  isExpanded,
}: {
  isExpanded: boolean
}) {
  return (
    <div
      className={cn(
        'mt-17 mb-20 flex shrink-0 items-center transition-all',
        isExpanded ? 'ml-20 gap-8' : 'mt-[22px] justify-center',
      )}
    >
      <Image
        src="/images/profile.png"
        alt="profile"
        width={30}
        height={30}
        className="rounded-full shadow-sm"
      />
      {isExpanded && (
        <span className="text-body-3 text-gray-default animate-in fade-in duration-300">
          시너잇님
        </span>
      )}
    </div>
  )
}
