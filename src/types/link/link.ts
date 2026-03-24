import { ReferenceItem } from '../reference/reference'

export type LinkStatus = 'UNREAD' | 'READ' | 'PROCESSING'
export type LinkProcessingStatus = 'PENDING' | 'READY' | 'FAILED'

export interface LinkItem {
  id: number
  reference: Omit<ReferenceItem, 'linkCount'>
  title: string
  url: string
  aiSummary: string
  processingStatus: LinkProcessingStatus
  status: LinkStatus
  viewCount: number
}

export type LinkField = 'why' | 'memo' | 'title' | 'aiSummary' | 'url'

export type SearchLinkItem = LinkItem & {
  matchedFields: LinkField[]
}
