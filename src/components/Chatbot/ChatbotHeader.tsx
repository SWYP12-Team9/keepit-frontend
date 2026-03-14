import { Close, Sparkle } from '../Icon'

interface ChatbotHeaderProps {
  onClose: () => void
}

export default function ChatbotHeader({ onClose }: ChatbotHeaderProps) {
  return (
    <div className="flex h-[30px] w-full flex-none items-center justify-between">
      <div className="flex items-center gap-[4px]">
        <div className="flex items-center justify-center">
          <Sparkle width={16} height={16} className="text-blue-normal" />
        </div>
        <span className="text-body-4 text-gray-default text-center">
          AI Assist
        </span>
      </div>
      <button onClick={onClose} className="flex items-center justify-center">
        <Close width={30} height={30} />
      </button>
    </div>
  )
}
