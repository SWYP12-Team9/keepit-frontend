import { BaseResponse } from '@/src/types/response/response'
import { axiosInstance } from '../instance/axiosInstance'
import { OtherUserLinkItem } from '@/src/types/recommendations/recommendations'

export interface RequestGetSearchOtherUserLinksParams {
  keyword: string
  size?: number
}

export type RequestGetSearchOtherUserLinksResponse = BaseResponse<{
  contents: OtherUserLinkItem[]
  nextCursor: string | null
  hasNext: boolean
}>

export const requestGetSearchOtherUserLinks = async (
  params: RequestGetSearchOtherUserLinksParams,
): Promise<RequestGetSearchOtherUserLinksResponse> => {
  const res = await axiosInstance.get('/recommendations/search', {
    params,
  })

  return res.data
}
