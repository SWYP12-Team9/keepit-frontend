'use client'

import { useSaveLinkModalStore } from '@/src/store/saveLinkModalStore'
import Image from 'next/image'

export function OpenSaveLinkButton() {
  const openSaveLinkModal = useSaveLinkModalStore((state) => state.open)

  return (
    <button
      className="bg-gray-box rounded-20 absolute right-40 bottom-40 cursor-pointer p-20 shadow-[0px_0px_10px_0px_rgba(230,230,230,1)]"
      onClick={() => openSaveLinkModal()}
    >
      <Image src="/icons/plus-box.svg" alt="plus" width={40} height={40} />
    </button>
  )
}
