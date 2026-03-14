'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import ChatbotHeader from './ChatbotHeader'
import ChatbotInput from './ChatbotInput'
import ChatbotMessage, { Message } from './ChatbotMessage'
import { usePostChatbotMessageMutation } from '@/src/apis/query/chatbot/usePostChatbotMessageMutation'
import { showErrorToast } from '@/src/utils/toast'
import { isAxiosError } from 'axios'

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
}

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'ai',
      content:
        '찾고 싶은 링크가 있으신가요?\n어떤 분야의 링크를 원하시는지 편하게 말씀해주세요!',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const { mutate: sendMessage, isPending: isLoading } =
    usePostChatbotMessageMutation()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return

    const currentMessage = inputValue

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')

    sendMessage(
      { message: currentMessage },
      {
        onSuccess: (data) => {
          let links: { id: string; title: string; url: string }[] | undefined =
            undefined

          if (data.userLinks) {
            if (Array.isArray(data.userLinks)) {
              links = data.userLinks.map((link) => ({
                id: link.id.toString(),
                title: link.title,
                url: link.url,
              }))
            } else {
              links = [
                {
                  id: data.userLinks.id.toString(),
                  title: data.userLinks.title,
                  url: data.userLinks.url,
                },
              ]
            }
          }

          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: data.answer,
            links: links,
          }
          setMessages((prev) => [...prev, aiMessage])
        },
        onError: (error) => {
          if (isAxiosError(error) && error.response?.status === 429) {
            showErrorToast(
              '하루 챗봇 사용량을 초과했어요. 내일 다시 시도해 주세요.',
            )
          } else {
            showErrorToast(
              '요청 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.',
            )
          }
        },
      },
    )
  }

  const handleSuggestedClick = (text: string) => {
    setInputValue(text)
  }

  if (!isOpen) return null

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-none bg-white p-[20px] lg:h-[calc(100vh-24px)] lg:w-[373px] lg:rounded-tl-[20px]">
      <ChatbotHeader onClose={onClose} />

      <div className="scrollbar-hide flex flex-1 flex-col gap-[20px] overflow-y-auto py-4">
        <div className="flex w-full justify-center py-6">
          <Image
            src="/images/chatbot-sphere.png"
            alt="AI Sphere"
            width={160}
            height={160}
            className="object-contain"
          />
        </div>

        {messages.map((msg) => (
          <ChatbotMessage key={msg.id} message={msg} />
        ))}

        {messages.length === 1 && messages[0].type === 'ai' && (
          <div className="flex w-full flex-col items-end gap-[10px] px-2 pr-[14px]">
            {[
              '경제랑 관련된 링크 찾고 싶어',
              '개발 공부할 만한 자료 있어?',
              'IT 뉴스 관련 링크 요약해줘',
            ].map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedClick(question)}
                className="text-body-4 text-gray-default hover:bg-blue-light flex max-w-fit items-center gap-[10px] rounded-[8px] bg-[#EFF0FC] px-[20px] py-[10px] text-right transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {isLoading && (
          <ChatbotMessage
            message={{
              id: 'loading',
              type: 'ai',
              isLoading: true,
            }}
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatbotInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        isLoading={isLoading}
      />
    </div>
  )
}
