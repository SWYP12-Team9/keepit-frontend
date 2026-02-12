'use client'

import { SaveLinkModal } from '@/src/components/Modal'
import { OpenSaveLinkButton } from '@/src/components/OpenSaveLinkButton/OpenSaveLinkButton'
import { Sidebar } from '@/src/components/Sidebar'
import { usePathname } from 'next/navigation'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isMyPage = pathname === '/mypage'

  return (
    <div className="bg-blue-light flex h-screen">
      <Sidebar />

      <main className="relative flex min-w-0 flex-1 pt-24">
        <div className="rounded-tl-20 flex min-w-0 flex-1 flex-col bg-white">
          {children}
        </div>
        {!isMyPage && <OpenSaveLinkButton />}
        <SaveLinkModal />
      </main>
    </div>
  )
}
