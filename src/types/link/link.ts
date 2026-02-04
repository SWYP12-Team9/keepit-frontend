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
