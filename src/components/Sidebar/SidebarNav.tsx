'use client'

import { cn } from '@/src/utils/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentType, SVGProps } from 'react'

interface SidebarNavProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
  href: string
  isExpanded: boolean
  onNavigate?: () => void
}

export default function SidebarNav({
  icon: Icon,
  label,
  href,
  isExpanded,
  onNavigate,
}: SidebarNavProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        'group flex items-center transition-all',
        isExpanded
          ? 'mx-2 gap-8 rounded-xl px-8 py-10'
          : 'mx-auto w-fit justify-center rounded-[10px] px-[8px] py-[10px]',

        isActive ? 'bg-gray-white' : 'hover:bg-gray-white text-gray-default',
      )}
    >
      <div
        className={cn(
          'flex flex-shrink-0 items-center justify-center transition-all',
          isExpanded
            ? 'h-[22px] w-[22px]'
            : 'h-[30px] w-[30px] [&_path]:stroke-[2]',
        )}
      >
        <Icon className="h-full w-full" />
      </div>

      {isExpanded && (
        <span
          className={cn(
            'text-body-3 transition-colors',
            isActive ? 'text-gray-black font-semibold' : 'text-gray-default',
          )}
        >
          {label}
        </span>
      )}
    </Link>
  )
}
