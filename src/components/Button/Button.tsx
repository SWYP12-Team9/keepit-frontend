import { cn } from '@/src/utils/cn'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ButtonVariant } from './types'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width: string
  height: string
  variant?: ButtonVariant
  className?: string
  children: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-light-active',
  secondary: 'bg-gray-field',
}

export function Button({
  width,
  height,
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'text-body-4 text-gray-default rounded-8',
        width,
        height,
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
