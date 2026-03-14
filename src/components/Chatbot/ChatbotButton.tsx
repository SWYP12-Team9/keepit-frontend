'use client'

import { AiStar } from '../Icon'
import { useChatbotStore } from '@/src/store/chatbotStore'

export default function ChatbotButton() {
  const { isOpen, toggle } = useChatbotStore()

  if (isOpen) return null

  return (
    <button
      onClick={toggle}
      className="absolute right-[6px] bottom-[76px] z-50 flex h-[70px] w-[70px] flex-row items-center justify-center p-[0px] transition-all duration-300 hover:scale-105 active:scale-95 md:right-[30px] md:bottom-[100px]"
    >
      <div className="flex h-full w-full items-center justify-center">
        <AiStar className="h-full w-full" />
      </div>
    </button>
  )
}
