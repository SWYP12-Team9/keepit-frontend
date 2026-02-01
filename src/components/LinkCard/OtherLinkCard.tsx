import { OtherLinkCardFooter } from './LinkCardFooter'
import { LinkCardLayout } from './LinkCardLayout'

interface OtherLinkCardProps {
  data: {
    id: number
    url: string
    title: string
    aiSummary: string
    category: string
    user: {
      userId: number
      nickname: string
      profileImageUrl: string
    }
  }
}

export function OtherLinkCard({ data }: OtherLinkCardProps) {
  return (
    <LinkCardLayout
      title={data.title}
      aiSummary={data.aiSummary}
      header={
        <div className="flex h-[38px] items-center px-12 pt-2">
          <span className="text-caption-1 text-gray-disabled">
            {data.category}
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
