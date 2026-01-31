import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-display-1',
        'text-display-2',
        'text-heading-1',
        'text-heading-2',
        'text-heading-3',
        'text-body',
        'text-body-0',
        'text-body-1',
        'text-body-2',
        'text-body-3',
        'text-body-4',
        'text-caption-1',
        'text-caption-2',
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
