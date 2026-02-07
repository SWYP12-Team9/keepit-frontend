import { ReferenceItem } from '../reference/reference'

export interface LinkItem {
  id: number
  reference: Omit<ReferenceItem, 'linkCount'>
  title: string
  url: string
  aiSummary: string
  status: 'UNREAD' | 'READ'
  viewCount: number
}

export type LinkField = 'why' | 'memo' | 'title' | 'aiSummary' | 'url'

export type SearchLinkItem = LinkItem & {
  matchedFields: LinkField[]
}
