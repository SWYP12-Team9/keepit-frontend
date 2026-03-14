'use client'

import { useSaveLinkModalStore } from '@/src/store/saveLinkModalStore'
import { PlusGradient } from '../Icon'

export function OpenSaveLinkButton() {
  const openSaveLinkModal = useSaveLinkModalStore((state) => state.open)

  return (
    <button
      className="absolute right-[6px] bottom-[16px] z-50 flex h-[70px] w-[70px] flex-row items-center justify-center p-[0px] transition-all duration-300 hover:scale-105 active:scale-95 md:right-[30px] md:bottom-[30px]"
      onClick={() => openSaveLinkModal()}
    >
      <div className="flex h-full w-full items-center justify-center">
        <PlusGradient className="h-full w-full" />
      </div>
    </button>
  )
}
