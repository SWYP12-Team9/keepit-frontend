'use client'

import { cn } from '@/src/utils/cn'
import { NavExplore, NavHome, NavMypage, NavRef } from '../Icon'
import { SidebarFooter } from './SidebarFooter'
import SidebarLogo from './SidebarLogo'
import SidebarNav from './SidebarNav'
import SidebarProfile from './SidebarProfile'
import SidebarReferenceListList from './SidebarReferenceList'
import { useDrawerStore } from '@/src/store/drawerStore'

const navItems = [
  { icon: NavHome, label: '홈', href: '/' },
  { icon: NavExplore, label: '탐색', href: '/explore' },
  { icon: NavRef, label: '레퍼런스', href: '/reference' },
  { icon: NavMypage, label: '마이페이지', href: '/mypage' },
]

export function Sidebar() {
  const isDrawerOpen = useDrawerStore((state) => state.isOpen)
  const isExpanded = !isDrawerOpen

  return (
    <aside
      className={cn(
        'bg-blue-light flex h-screen flex-col pb-[30px]',
        isExpanded ? 'w-[240px] px-10' : 'w-[62px] items-center px-0',
      )}
    >
      <SidebarLogo isExpanded={isExpanded} />
      <SidebarProfile isExpanded={isExpanded} />
      <nav className="shrink-0 space-y-2">
        {navItems.map((item, index) => (
          <SidebarNav key={index} {...item} isExpanded={isExpanded} />
        ))}
      </nav>
      <div className="flex-1" />
      <div className="flex shrink-0 flex-col">
        {isExpanded && <div className="bg-gray-white mx-[10px] h-[1px]" />}
        <div className="max-h-[250px] overflow-hidden">
          <SidebarReferenceListList isExpanded={isExpanded} />
        </div>
        <div className="mt-[20px]">
          <SidebarFooter isExpanded={isExpanded} />
        </div>
      </div>
    </aside>
  )
}
