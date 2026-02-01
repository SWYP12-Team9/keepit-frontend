import Image from 'next/image'
import type { ReactNode } from 'react'

interface LayoutProps {
  header: ReactNode
  footer: ReactNode
  title: string
  aiSummary: string
}

export function LinkCardLayout({
  header,
  footer,
  title,
  aiSummary,
}: LayoutProps) {
  return (
    <div className="bg-gray-box mb-12 flex h-[286px] w-[331px] flex-col rounded-[10px] px-8 pt-8 pb-[10px] opacity-100">
      {header}

      <div className="mb-16 max-w-[273px] px-12">
        <div className="text-body-1 min-h-[72px] text-[#2D2D2D]">
          <div className="line-clamp-3 [display:-webkit-box] overflow-hidden text-justify break-all [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
            <span>{title}</span>
          </div>
        </div>
      </div>

      <div className="flex h-[146px] flex-col overflow-hidden rounded-2xl bg-white px-20 pt-20 pb-[14px]">
        <div className="flex min-h-[66px] gap-3">
          <div className="mt-1 shrink-0">
            <Image
              src="../icons/card/sparkle.svg"
              alt="sparkle"
              width={22}
              height={22}
            />
          </div>
          <p className="text-gray-default text-body-4 line-clamp-3 [display:-webkit-box] overflow-hidden text-justify break-all [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
            {aiSummary}
          </p>
        </div>

        <div className="mt-auto w-full">
          <div className="bg-gray-field mt-[14px] mb-[10px] h-[1px] w-full" />
          <div className="flex items-center justify-between">
            {footer}
            <button className="p-2">
              <Image
                src="../icons/card/copy.svg"
                alt="copy"
                width={22}
                height={22}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
