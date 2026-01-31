import { cn } from '@/src/utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'rounded-8 placeholder:text-gray-muted bg-gray-field text-gray-default text-caption-1 w-full px-20 py-14',
        className,
      )}
      {...props}
    />
  )
}
