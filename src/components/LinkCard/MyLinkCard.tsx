import { MyLinkCardFooter } from './LinkCardFooter'
import { MyLinkCardHeader } from './LinkCardHeader'
import { LinkCardLayout } from './LinkCardLayout'

interface MyLinkCardProps {
  data: {
    id: number
    title: string
    aiSummary: string
    status: 'READ' | 'UNREAD'
    viewCount: number
    references: {
      id: number
      title: string
      colorCode: string
      isDefault: boolean
    }
  }
}

export function MyLinkCard({ data }: MyLinkCardProps) {
  return (
    <LinkCardLayout
      title={data.title}
      aiSummary={data.aiSummary}
      header={
        <MyLinkCardHeader
          title={data.references.title}
          colorCode={data.references.colorCode}
        />
      }
      footer={
        <MyLinkCardFooter
          viewCount={data.viewCount}
          isRead={data.status === 'READ'}
        />
      }
    />
  )
}
