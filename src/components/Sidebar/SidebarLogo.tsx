import { cn } from '@/src/utils/cn'
import Image from 'next/image'

export default function SidebarLogo({ isExpanded }: { isExpanded: boolean }) {
  return (
    <div
      className={cn(
        'flex shrink-0 justify-center pt-50 transition-all',
        !isExpanded && 'w-full',
      )}
    >
      <Image
        src={isExpanded ? '/images/logo-keepit.png' : '/images/logo-symbol.png'}
        alt="logo"
        width={isExpanded ? 129 : 22}
        height={isExpanded ? 51 : 28}
        className="transition-all duration-300"
        priority
      />
    </div>
  )
}
