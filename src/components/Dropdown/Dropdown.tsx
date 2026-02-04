'use client'

import { ReactNode, useState } from 'react'
import { cn } from '@/src/utils/cn'
import { DropdownTrigger } from './DropdownTrigger'
import { DropdownOption } from './types'
import { DropdownItem } from './DropdownItem'
import { DropdownMenu } from './DropdownMenu'

export interface DropdownProps {
  options?: DropdownOption[]
  value: DropdownOption | null
  onChange: (option: DropdownOption) => void
  placeholder?: string
  className?: string
  footerButton?: (close: () => void) => ReactNode
}

export function Dropdown({
  options = [],
  value,
  onChange,
  placeholder = '',
  className,
  footerButton,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const closeDropdown = () => setIsOpen(false)

  const handleSelect = (option: DropdownOption) => {
    onChange(option)
    closeDropdown()
  }

  const displayLabel = value?.title || placeholder

  return (
    <div className={cn('relative w-full', className)}>
      <DropdownTrigger
        label={displayLabel}
        isOpen={isOpen}
        isPlaceholder={!value}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <DropdownMenu>
          {/* 드롭다운 옵션 목록 */}
          {options.map((option) => (
            <DropdownItem
              key={option.id}
              option={option}
              onSelect={handleSelect}
            />
          ))}

          {footerButton && footerButton(closeDropdown)}
        </DropdownMenu>
      )}
    </div>
  )
}
