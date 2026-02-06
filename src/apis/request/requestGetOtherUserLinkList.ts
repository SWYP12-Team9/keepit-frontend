import { BaseResponse } from '@/src/types/response/response'
import { axiosInstance } from '../instance/axiosInstance'
import { OtherUserLinkItem } from '@/src/types/recommendations/recommendations'

export interface RequestGetOtherUserLinkListParams {
  category?: string
  size?: number
}

export type RequestGetOtherUserLinkListResponse = BaseResponse<
  OtherUserLinkItem[]
>

export const requestGetOtherUserLinkList = async ({
  category,
  size,
}: RequestGetOtherUserLinkListParams): Promise<RequestGetOtherUserLinkListResponse> => {
  const res = await axiosInstance.get('/recommendations', {
    params: {
      category,
      size,
    },
  })

  return res.data
}
