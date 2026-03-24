'use client'

import { cn } from '@/src/utils/cn'
import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  children: ReactNode
  width?: string
  height?: string
  className?: string
  onClose?: () => void
}

export function Modal({
  isOpen,
  children,
  width,
  onClose,
  height,
  className,
}: ModalProps) {
  return isOpen ? (
    <div
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center duration-250"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'animate-in fade-in zoom-in-[0.985] slide-in-from-bottom-2 rounded-20 relative z-10 bg-white p-30 duration-350 ease-out',
          'shadow-[0_0_10px_0_rgba(234,234,234,1)]',
          width,
          height,
          className,
        )}
      >
        {children}
      </div>
    </div>
  ) : null
}
