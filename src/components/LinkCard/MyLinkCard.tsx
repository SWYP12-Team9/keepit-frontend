import { LinkItem, SearchLinkItem } from '@/src/types/link/link'
import { MyLinkCardFooter } from './LinkCardFooter'
import { MyLinkCardHeader } from './LinkCardHeader'
import { LinkCardLayout } from './LinkCardLayout'

interface MyLinkCardProps {
  data: LinkItem | SearchLinkItem
  onDelete: (id: number) => void
}

export function MyLinkCard({ data, onDelete }: MyLinkCardProps) {
  return (
    <LinkCardLayout
      title={data.title}
      aiSummary={data.aiSummary}
      header={
        <MyLinkCardHeader
          title={data.reference.title}
          colorCode={data.reference.colorCode}
          onDelete={() => onDelete(data.id)}
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
