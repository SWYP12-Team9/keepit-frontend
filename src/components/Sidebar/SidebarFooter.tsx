import { cn } from '@/src/utils/cn'
import Link from 'next/link'
import { NavLogout, NavSetting } from '../Icon'

export function SidebarFooter({ isExpanded }: { isExpanded: boolean }) {
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
