import { OtherUserLinkItem } from '@/src/types/recommendations/recommendations'
import { OtherLinkCardFooter } from './LinkCardFooter'
import { LinkCardLayout } from './LinkCardLayout'

interface OtherLinkCardProps {
  data: OtherUserLinkItem
}

export function OtherLinkCard({ data }: OtherLinkCardProps) {
  return (
    <LinkCardLayout
      title={data.title}
      aiSummary={data.aiSummary}
      onCopyUrl={() => {}}
      header={
        <div className="flex h-[38px] items-center px-12 pt-2">
          <span className="text-caption-1 text-gray-disabled">
            {data.category?.name ?? ''}
          </span>
        </div>
      }
      footer={
        <OtherLinkCardFooter
          nickname={data.user.nickname}
          profileImageUrl={data.user.profileImageUrl}
        />
      }
    />
  )
}
