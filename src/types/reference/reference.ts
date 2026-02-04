export type ReferenceVisibility = 'all' | 'public' | 'private'

export type ReferenceSortBy =
  | 'latest'
  | 'oldest'
  | 'link-count-desc'
  | 'link-count-asc'

export interface ReferenceItem {
  id: number
  title: string
  colorCode: string
  linkCount: number
  isDefault: boolean
}
