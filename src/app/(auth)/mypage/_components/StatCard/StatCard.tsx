import Image from 'next/image'
import { ReactNode } from 'react'

interface StatCardProps {
  title: string
  date: string
  badge?: string
  children: ReactNode
  description: string
}

export function StatCard({
  title,
  date,
  badge,
  children,
  description,
}: StatCardProps) {
  return (
    <div className="rounded-20 bg-gray-stroke flex h-396 w-full flex-col gap-12 px-8 pt-12 pb-8">
      <div className="flex shrink-0 items-center justify-between px-16">
        <div className="flex items-center gap-12">
          {badge && (
            <Image
              src={`/icons/${badge}.svg`}
              alt={badge}
              width={20}
              height={20}
            />
          )}
          <h3 className="text-body-1 text-gray-default">{title}</h3>
        </div>
        <span className="text-caption-2 text-gray-disabled">{date}</span>
      </div>

      <div className="rounded-16 flex h-224 w-full shrink-0 items-center justify-center overflow-hidden bg-white p-14">
        <div className="flex w-full items-center justify-center">
          {children}
        </div>
      </div>
      <div className="rounded-16 flex h-102 w-full shrink-0 items-center overflow-hidden border border-indigo-100 bg-indigo-50 px-16 py-10">
        <p className="text-body-2 text-gray-default line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  )
}
