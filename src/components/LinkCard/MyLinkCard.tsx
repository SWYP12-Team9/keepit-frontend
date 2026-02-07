import { LinkItem, SearchLinkItem } from '@/src/types/link/link'
import { showErrorToast, showSuccessToast } from '@/src/utils/toast'
import { MyLinkCardFooter } from './LinkCardFooter'
import { MyLinkCardHeader } from './LinkCardHeader'
import { LinkCardLayout } from './LinkCardLayout'

interface MyLinkCardProps {
  data: LinkItem | SearchLinkItem
  onDelete: (id: number) => void
}

export function MyLinkCard({ data, onDelete }: MyLinkCardProps) {
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(data.url)
      showSuccessToast('링크가 복사되었습니다.')
    } catch (error) {
      console.error(error)
      showErrorToast('링크 복사에 실패했어요. 잠시 후 다시 시도해 주세요.')
    }
  }

  return (
    <LinkCardLayout
      title={data.title}
      aiSummary={data.aiSummary}
      onCopyUrl={handleCopyUrl}
      header={
        <MyLinkCardHeader
          title={data.reference?.title || ''}
          colorCode={data.reference?.colorCode || ''}
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
