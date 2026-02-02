import { BaseResponse } from '@/src/types/response/response'

export type ReferenceVisibility = 'all' | 'public' | 'private'

export type ReferenceSortBy =
  | 'latest'
  | 'oldest'
  | 'link-count-desc'
  | 'link-count-asc'

export interface RequestGetReferenceListParams {
  type?: ReferenceVisibility
  sortBy?: ReferenceSortBy
  cursor?: string
  size?: number
}

export interface ReferenceItem {
  id: number
  title: string
  colorCode: string
  linkCount: number
  isDefault: boolean
}

export type RequestGetReferenceListResponse = BaseResponse<{
  contents: ReferenceItem[]
  nextCursor: string
  hasNext: boolean
}>
