import { BaseResponse } from '@/src/types/response/response'
import { axiosInstance } from '../instance/axiosInstance'
import { LinkField, SearchLinkItem } from '@/src/types/link/link'

export interface RequestGetSearchLinksParams {
  keyword: string
  field?: LinkField
  referenceId?: number
  cursor?: string
  size: number
}

export type RequestGetSearchLinksResponse = BaseResponse<{
  items: SearchLinkItem[]
  nextCursor: string
  hasNext: boolean
  keyword: string
}>

export const requestGetSearchLinks = async (
  params: RequestGetSearchLinksParams,
): Promise<RequestGetSearchLinksResponse> => {
  const res = await axiosInstance.get('/user-links/search', {
    params: params,
  })

  return res.data
}
