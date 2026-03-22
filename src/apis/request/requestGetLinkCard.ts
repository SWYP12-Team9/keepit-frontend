import { BaseResponse } from '@/src/types/response/response'
import { LinkItem } from '@/src/types/link/link'
import { axiosInstance } from '../instance/axiosInstance'

export type RequestGetLinkCardResponse = BaseResponse<LinkItem>

export const requestGetLinkCard = async (
  id: number,
): Promise<RequestGetLinkCardResponse> => {
  const res = await axiosInstance.get(`/user-links/${id}/preview`)

  return res.data
}
