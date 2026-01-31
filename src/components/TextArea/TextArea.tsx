import { cn } from '@/src/utils/cn'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  width?: string
  height?: string
}

export function TextArea({
  className,
  width = 'w-full',
  height,
  ...props
}: TextAreaProps) {
  return (
    <textarea
      className={cn(
        'rounded-8 placeholder:text-gray-muted text-gray-default text-caption-1 resize-none bg-[#F2F2F2] px-20 py-14',
        width,
        height,
        className,
      )}
      {...props}
    />
  )
}
