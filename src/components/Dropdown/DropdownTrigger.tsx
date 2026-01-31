import { cn } from '@/src/utils/cn'
import Image from 'next/image'

interface DropdownTriggerProps {
  label: string
  isOpen: boolean
  isPlaceholder: boolean
  onClick: () => void
}

export function DropdownTrigger({
  label,
  isOpen,
  isPlaceholder,
  onClick,
}: DropdownTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-gray-field rounded-8 flex w-full items-center justify-between px-20 py-16"
    >
      <span
        className={cn(
          'text-caption-1',
          isPlaceholder ? 'text-gray-muted' : 'text-gray-default',
        )}
      >
        {label}
      </span>
      <Image
        src="/icons/arrow-down.svg"
        alt="arrow"
        width={22}
        height={22}
        className={cn(
          'transition-transform duration-300',
          isOpen && 'rotate-180',
        )}
      />
    </button>
  )
}
