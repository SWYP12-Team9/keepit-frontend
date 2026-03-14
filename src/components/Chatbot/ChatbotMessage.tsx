import { ArrowDown, Sparkle } from '../Icon'
import { useOpenLinkDrawer } from '@/src/hooks/useOpenLinkDrawer'
import { useChatbotStore } from '@/src/store/chatbotStore'
import MarkdownContent from './MarkdownContent'

export type MessageType = 'user' | 'ai'

export interface LinkCardData {
  id: string
  title: string
  url: string
}

export interface Message {
  id: string
  type: MessageType
  content?: string
  links?: LinkCardData[]
  isLoading?: boolean
}

interface ChatbotMessageProps {
  message: Message
}

export default function ChatbotMessage({ message }: ChatbotMessageProps) {
  const { type, content, links, isLoading } = message
  const closeChatbot = useChatbotStore((state) => state.close)
  const { openLinkDrawer } = useOpenLinkDrawer()

  const handleLinkClick = async (idStr: string) => {
    const numericId = Number(idStr)
    if (!isNaN(numericId)) {
      try {
        await openLinkDrawer(numericId)
        closeChatbot()
      } catch (error) {
        console.error('링크 상세를 여는 중 오류 발생:', error)
      }
    }
  }

  if (type === 'user') {
    return (
      <div className="flex w-full justify-end">
        <div className="bg-blue-light flex items-center justify-center gap-[10px] rounded-[8px] px-[20px] py-[10px]">
          <p className="text-body-4 text-gray-default text-center">{content}</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex w-full flex-col items-start gap-[10px]">
        <div className="flex items-center gap-[6px] py-[8px]">
          <Sparkle
            width={14}
            height={14}
            className="text-blue-normal animate-pulse"
          />
          <span className="text-body-4 animate-pulse text-center text-black">
            답변 중...
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-start gap-[10px]">
      {content && (
        <div className="bg-gray-field flex items-center justify-center gap-[10px] rounded-[8px] px-[20px] py-[10px]">
          <MarkdownContent
            content={content}
            className="text-body-4 text-gray-default w-full"
          />
        </div>
      )}

      {links && links.length > 0 && (
        <div className="flex w-full flex-col gap-[10px]">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="bg-gray-field group flex w-full cursor-pointer flex-col items-end gap-[12px] rounded-[16px] border border-transparent px-[20px] py-[16px] transition-all duration-300 hover:border-blue-100 hover:bg-white hover:shadow-md"
            >
              <p className="text-body-3 text-gray-default group-hover:text-blue-normal w-full truncate text-left font-medium transition-colors">
                {link.title}
              </p>
              <div className="flex items-center justify-center gap-[4px]">
                <span className="text-caption-1 text-gray-muted group-hover:text-blue-normal tracking-[0.01em] transition-colors">
                  확인하기
                </span>
                <div className="text-gray-muted group-hover:text-blue-normal -rotate-90 transition-colors">
                  <ArrowDown width={15} height={15} />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
