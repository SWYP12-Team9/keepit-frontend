import { BaseResponse } from '@/src/types/response/response'
import { axiosInstance } from '../instance/axiosInstance'
import { OtherUserLinkItem } from '@/src/types/recommendations/recommendations'

export interface RequestGetOtherUserLinkListParams {
  category?: string | null
  cursor?: string | number | null
  size?: number
}

export type RequestGetOtherUserLinkListResponse = BaseResponse<{
  contents: OtherUserLinkItem[]
  nextCursor: string | number | null
  hasNext: boolean
}>

export const requestGetOtherUserLinkList = async ({
  category,
  cursor,
  size = 20,
}: RequestGetOtherUserLinkListParams): Promise<RequestGetOtherUserLinkListResponse> => {
  const params: Record<string, string | number> = {
    size,
  }

  if (cursor !== undefined && cursor !== null) {
    params.cursor = cursor
  }

  // category가 존재하고 '전체'가 아닌 경우에만 파라미터에 추가
  if (category && category !== '전체') {
    params.category = category
  }

  const res = await axiosInstance.get('/recommendations', {
    params,
  })

  return res.data
}
