import { SaveLinkModal } from '@/src/components/Modal'
import { OpenSaveLinkButton } from '@/src/components/OpenSaveLinkButton/OpenSaveLinkButton'
import { Sidebar } from '@/src/components/Sidebar'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-blue-light flex h-screen">
      <Sidebar />

      <main className="relative flex flex-1 pt-24">
        <div className="rounded-tl-20 flex flex-1 flex-col bg-white">
          {children}
        </div>
        <OpenSaveLinkButton />
        <SaveLinkModal />
      </main>
    </div>
  )
}
