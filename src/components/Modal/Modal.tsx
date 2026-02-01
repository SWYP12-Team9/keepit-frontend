'use client'

import { cn } from '@/src/utils/cn'
import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  children: ReactNode
  width?: string
  height?: string
  className?: string
}

export function Modal({
  isOpen,
  children,
  width,
  height,
  className,
}: ModalProps) {
  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={cn(
          'rounded-20 relative z-10 bg-white p-30',
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
