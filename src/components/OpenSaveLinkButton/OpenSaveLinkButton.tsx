'use client'

import { useSaveLinkModalStore } from '@/src/store/saveLinkModalStore'
import Image from 'next/image'

export function OpenSaveLinkButton() {
  const openSaveLinkModal = useSaveLinkModalStore((state) => state.open)

  return (
    <button
      className="absolute right-40 bottom-40 cursor-pointer"
      onClick={() => openSaveLinkModal()}
    >
      <Image
        src="/images/link-floating.png"
        alt="링크 저장 버튼"
        width={70}
        height={70}
        priority
      />
    </button>
  )
}
