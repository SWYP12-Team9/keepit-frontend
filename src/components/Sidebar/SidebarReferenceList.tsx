'use client'

import { useAuthStore } from '@/src/store/authStore'
import { cn } from '@/src/utils/cn'

interface SidebarReference {
  label: string
  color: string
}

interface SidebarReferenceListProps {
  isExpanded: boolean
}

const TAG_DATA: SidebarReference[] = [
  { label: '경제', color: '#66FF66' },
  { label: '과제', color: '#66CCFF' },
  { label: '콜라', color: '#4D33FF' },
  { label: '두쫀쿠', color: '#4D33FF' },
  { label: '거울', color: '#4D33FF' },
  { label: '아이패드', color: '#4D33FF' },
  { label: '키링', color: '#4D33FF' },
  { label: '스위프', color: '#4D33FF' },
  { label: '스위프', color: '#4D33FF' },
  { label: '스위프', color: '#4D33FF' },
  { label: '스위프', color: '#4D33FF' },
  { label: '스위프', color: '#4D33FF' },
  { label: '스위프', color: '#4D33FF' },
  { label: '스위프', color: '#4D33FF' },
  { label: '스위프', color: '#4D33FF' },
]

export default function SidebarReferenceList({
  isExpanded,
}: SidebarReferenceListProps) {
  const { isLoggedIn } = useAuthStore()

  if (!isExpanded) return null

  return (
    <div className="mt-12 flex max-h-236 flex-col pl-[22px]">
      <span className="text-caption-1 text-gray-disabled mb-[15px]">
        자주 찾는 레퍼런스
      </span>

      <div
        className={cn(
          'custom-scrollbar flex flex-col overflow-x-hidden overflow-y-auto',
          'gap-8 pb-8',
        )}
      >
        {isLoggedIn ? (
          TAG_DATA.map((tag, idx) => (
            <div
              key={`${tag.label}-${idx}`}
              className="group flex cursor-pointer items-center gap-5 py-4"
            >
              <div
                className="h-[12px] w-[12px] flex-shrink-0 rounded-[2px]"
                style={{ backgroundColor: tag.color }}
              />
              <span className="text-body-4 text-gray-default">{tag.label}</span>
            </div>
          ))
        ) : (
          <p className="text-body-3 text-gray-default">
            로그인하고 링크를 저장해보세요
          </p>
        )}
      </div>
    </div>
  )
}
