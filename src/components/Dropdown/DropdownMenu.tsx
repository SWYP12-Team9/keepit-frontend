import { ReactNode } from 'react'

interface DropdownMenuProps {
  children: ReactNode
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  return (
    <div className="bg-gray-field rounded-8 absolute top-full left-0 z-10 mt-2 max-h-200 w-full overflow-y-auto p-5">
      {children}
    </div>
  )
}
