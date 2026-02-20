'use client'

import { useSaveLinkModalStore } from '@/src/store/saveLinkModalStore'
import Image from 'next/image'

export function OpenSaveLinkButton() {
  const openSaveLinkModal = useSaveLinkModalStore((state) => state.open)

  return (
    <button
      className="absolute right-16 bottom-20 cursor-pointer md:right-40 md:bottom-40"
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
