import { cn } from '@/src/utils/cn'
import Image, { ImageProps } from 'next/image'

interface EmptyLinksProps {
  message: string
  imageProps: ImageProps
  className?: string
}

export function EmptyLinks({
  message,
  imageProps,
  className,
}: EmptyLinksProps) {
  return (
    <div
      className={cn(
        'flex h-full flex-col items-center justify-center gap-20',
        className,
      )}
    >
      <Image {...imageProps} />
      <span className="text-body-1 text-gray-default">{message}</span>
    </div>
  )
}
