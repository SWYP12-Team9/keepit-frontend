import { BaseResponse } from '@/src/types/response/response'
import { axiosInstance } from '../instance/axiosInstance'
import { OtherUserLinkItem } from '@/src/types/recommendations/recommendations'

export interface RequestGetSearchOtherUserLinksParams {
  keyword: string
  size?: number
}

export type RequestGetSearchOtherUserLinksResponse = BaseResponse<
  OtherUserLinkItem[]
>

export const requestGetSearchOtherUserLinks = async ({
  keyword,
  size = 10,
}: RequestGetSearchOtherUserLinksParams): Promise<RequestGetSearchOtherUserLinksResponse> => {
  const res = await axiosInstance.get('/recommendations/search', {
    params: {
      keyword,
      size,
    },
  })

  return res.data
}
