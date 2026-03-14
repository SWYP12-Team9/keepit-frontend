import { Send } from '../Icon'

interface ChatbotInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  isLoading?: boolean
}

export default function ChatbotInput({
  value,
  onChange,
  onSend,
  isLoading,
}: ChatbotInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="bg-gray-field flex h-[60px] w-full flex-none items-center justify-between gap-[10px] rounded-[14px] px-[20px] py-[14px]">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="무엇이든 물어보세요"
        className="text-body-1 placeholder:text-gray-muted text-gray-default w-full bg-transparent outline-none"
        disabled={isLoading}
      />
      <button
        onClick={onSend}
        disabled={isLoading || !value.trim()}
        className="flex items-center justify-center"
      >
        <div className="text-gray-muted">
          <Send width={19} height={19} />
        </div>
      </button>
    </div>
  )
}
