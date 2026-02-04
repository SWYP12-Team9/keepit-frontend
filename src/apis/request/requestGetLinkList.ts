import { axiosInstance } from '../instance/axiosInstance'
import { BaseResponse } from '@/src/types/response/response'
import { LinkItem } from '@/src/types/link/link'

export interface RequestGetLinkListParams {
  referenceId?: number
}

export type RequestGetLinkListResponse = BaseResponse<{
  contents: LinkItem[]
  nextCursor: string
  hasNext: boolean
}>

export const requestGetLinkList = async ({
  referenceId,
}: RequestGetLinkListParams): Promise<RequestGetLinkListResponse> => {
  const res = await axiosInstance.get('/user-links', {
    params: {
      referenceId,
    },
  })

  return res.data
}
