import { ReferenceItem } from '../reference/reference'

export interface LinkItem {
  id: number
  references: Omit<ReferenceItem, 'linkCount'>
  title: string
  url: string
  aiSummary: string
  status: 'UNREAD' | 'READ'
  viewCount: number
}

export type LinkField = 'why' | 'memo' | 'title' | 'aiSummary' | 'url'

export type SearchLinkItem = Omit<LinkItem, 'status' | 'references'> & {
  why: string
  memo: string
  matchedFields: LinkField[]
}
