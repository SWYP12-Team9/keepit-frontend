import { DropdownOption } from './types'

interface DropdownItemProps {
  option: DropdownOption
  onSelect: (option: DropdownOption) => void
}

export function DropdownItem({ option, onSelect }: DropdownItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option)}
      className="text-caption-1 rounded-8 text-gray-muted hover:bg-gray-muted w-full px-20 py-11 text-left transition-colors hover:text-black"
    >
      {option.title}
    </button>
  )
}
