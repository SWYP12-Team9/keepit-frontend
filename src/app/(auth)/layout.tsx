'use client'

import { SaveLinkModal } from '@/src/components/Modal'
import { OpenSaveLinkButton } from '@/src/components/OpenSaveLinkButton/OpenSaveLinkButton'
import { Sidebar } from '@/src/components/Sidebar'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isMyPage = pathname === '/mypage'
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="bg-blue-light flex h-dvh min-h-screen overflow-hidden">
      <div className="hidden h-full md:block">
        <Sidebar />
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="bg-blue-light flex items-center justify-between px-16 py-12 md:hidden">
          <Image
            src="/images/logo-keepit.png"
            alt="keepit"
            width={96}
            height={38}
            priority
          />
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="text-body-3 text-gray-default rounded-10 bg-white px-14 py-8"
          >
            메뉴
          </button>
        </header>

        <main className="relative flex min-h-0 min-w-0 flex-1 pt-0 md:pt-24">
          <div className="md:rounded-tl-20 flex min-h-0 min-w-0 flex-1 flex-col rounded-none bg-white">
            {children}
          </div>
          {!isMyPage && <OpenSaveLinkButton />}
          <SaveLinkModal />
        </main>
      </div>

      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            aria-label="메뉴 닫기"
            className="absolute inset-0 bg-black/25"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          <div className="relative h-full w-[240px] max-w-[85vw] shadow-xl">
            <Sidebar
              forceExpanded={true}
              onNavigate={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
