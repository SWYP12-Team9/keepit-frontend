import { cn } from '@/src/utils/cn'
import { UseFormRegisterReturn } from 'react-hook-form'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  register?: UseFormRegisterReturn
}

export function Input({ className, register, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'rounded-8 placeholder:text-gray-muted bg-gray-field text-gray-default text-caption-1 w-full px-20 py-14',
        className,
      )}
      {...register}
      {...props}
    />
  )
}
