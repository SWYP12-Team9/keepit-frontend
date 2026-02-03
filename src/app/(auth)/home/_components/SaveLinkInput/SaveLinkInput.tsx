import { Input } from '@/src/components/Input'
import { useSaveLinkModalStore } from '@/src/store/saveLinkModalStore'
import Image from 'next/image'
import { useState } from 'react'

export function SaveLinkInput() {
  const [url, setUrl] = useState('')

  const openSaveLinkModal = useSaveLinkModalStore((state) => state.open)

  return (
    <div className="relative">
      <Input
        className="rounded-20 text-body-1 px-40"
        height="h-100"
        placeholder="다시 쓰고 싶은 링크를 넣어 보세요"
        onChange={(e) => setUrl(e.target.value)}
      />
      <Image
        src="/icons/share.svg"
        alt="share"
        width={40}
        height={40}
        className="absolute top-1/2 right-40 -translate-y-1/2 cursor-pointer"
        onClick={() => openSaveLinkModal(url)}
      />
    </div>
  )
}
