import { ReactNode } from 'react'

interface DropdownMenuProps {
  children: ReactNode
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  return (
    <div className="bg-gray-field rounded-8 absolute top-full left-0 z-10 mt-2 w-full p-5">
      {children}
    </div>
  )
}
