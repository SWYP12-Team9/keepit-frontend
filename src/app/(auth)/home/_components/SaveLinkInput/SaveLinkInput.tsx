import { Input } from '@/src/components/Input'
import { useSaveLinkModalStore } from '@/src/store/saveLinkModalStore'
import Image from 'next/image'

export function SaveLinkInput() {
  const url = useSaveLinkModalStore((state) => state.url)
  const setUrl = useSaveLinkModalStore((state) => state.setUrl)
  const openSaveLinkModal = useSaveLinkModalStore((state) => state.open)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      openSaveLinkModal(url)
    }
  }

  return (
    <div className="relative">
      <Input
        className="rounded-20 text-body-1 px-40"
        height="h-84 md:h-100"
        placeholder="다시 쓰고 싶은 링크를 넣어 보세요"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Image
        src="/icons/share.svg"
        alt="share"
        width={32}
        height={32}
        className="absolute top-1/2 right-20 -translate-y-1/2 cursor-pointer md:right-40"
        onClick={() => openSaveLinkModal(url)}
      />
    </div>
  )
}
