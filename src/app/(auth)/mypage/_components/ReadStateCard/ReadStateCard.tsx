'use client'

import { ReadStateData } from '@/src/apis/request/requestGetMypageStats'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'
import { ReadMetricCard } from '../ReadMetricCard/ReadMetricCard'
import { StatCard } from '../StatCard/StatCard'

interface ReadStateCardProps {
  data: ReadStateData
}

export function ReadStateCard({ data }: ReadStateCardProps) {
  const backgroundData = [{ value: 100, fill: '#E5E7EB' }]
  const readData = [{ value: data.readLinkPercent, fill: 'url(#readGradient)' }]

  return (
    <StatCard
      title="링크 열람 현황"
      date={data.date}
      badge="purple-view"
      description={data.text}
    >
      <div className="flex w-full items-center justify-center gap-12 py-12">
        <div
          className="relative shrink-0"
          style={{
            width: '120px',
            height: '120px',
            opacity: 1,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <linearGradient id="readGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="17.73%" stopColor="#6064DE" />
                  <stop offset="82.85%" stopColor="rgba(96, 100, 222, 0.4)" />
                </linearGradient>
              </defs>
              <Pie
                data={backgroundData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                dataKey="value"
                stroke="none"
                isAnimationActive={false}
              />

              <Pie
                data={readData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                dataKey="value"
                startAngle={90}
                endAngle={90 - (360 * data.readLinkPercent) / 100}
                cornerRadius={10}
                stroke="none"
                isAnimationActive={false}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-heading-2 text-blue-dark">
              {data.readLinkPercent}%
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-16">
          <ReadMetricCard
            label="열람"
            percent={data.readLinkPercent}
            count={data.readLinkCount}
            variant="read"
          />
          <ReadMetricCard
            label="미열람"
            percent={100 - data.readLinkPercent}
            count={data.unreadLinkCount}
            variant="unread"
          />
        </div>
      </div>
    </StatCard>
  )
}
