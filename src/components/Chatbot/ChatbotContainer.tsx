'use client'

import Chatbot from './Chatbot'
import { useChatbotStore } from '@/src/store/chatbotStore'

export default function ChatbotContainer() {
  const { isOpen, close } = useChatbotStore()

  return (
    <div
      className={`fixed inset-0 z-50 h-full w-full transition-transform duration-300 md:inset-auto md:top-[24px] md:right-0 md:h-auto md:w-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <Chatbot isOpen={isOpen} onClose={close} />
    </div>
  )
}
