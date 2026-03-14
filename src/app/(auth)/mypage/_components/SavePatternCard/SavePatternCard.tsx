'use client'

import { SavePatternData } from '@/src/apis/request/requestGetMypageStats'
import { StatCard } from '../StatCard/StatCard'

interface SavePatternCardProps {
  data: SavePatternData
}

export function SavePatternCard({ data }: SavePatternCardProps) {
  const maxCount = Math.max(...data.counts.map((c) => c.linkCount))

  const dayOrder = ['일', '월', '화', '수', '목', '금', '토']
  const sortedCounts = [...data.counts].sort(
    (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day),
  )

  return (
    <StatCard title="링크 저장 패턴" date={data.period} description={data.text}>
      <div className="flex h-full w-full items-end justify-between gap-10 pt-10">
        {sortedCounts.map((item) => {
          const heightPercent =
            maxCount > 0 ? (item.linkCount / maxCount) * 100 : 0
          const isPeak = item.day === data.peakDay

          return (
            <div
              key={item.day}
              className="flex flex-1 flex-col items-center gap-8"
            >
              <div className="relative h-140 w-full">
                <div className="rounded-12 bg-blue-light absolute inset-0" />
                <div
                  className={`rounded-12 absolute right-0 bottom-0 left-0 transition-all duration-300 ${
                    isPeak ? 'bg-blue-normal' : 'bg-[#A7AAFB]'
                  }`}
                  style={{
                    height: `${heightPercent}%`,
                    border: isPeak ? '1px solid #565AC8' : 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div
                className={`rounded-12 bg-gray-box flex w-full flex-col items-center justify-center px-2 py-4 ${isPeak ? 'border border-[#565AC8]' : 'border-none'}`}
              >
                <div className="text-caption-1 text-gray-default text-center font-medium">
                  {item.day}
                </div>
                <div className="text-caption-2 text-gray-disabled text-center whitespace-nowrap">
                  {item.linkCount}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </StatCard>
  )
}
