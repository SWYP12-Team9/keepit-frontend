import { BaseResponse } from '@/src/types/response/response'
import { axiosInstance } from '../instance/axiosInstance'
import { ReferenceItem } from '@/src/types/reference/reference'
import { LinkItem } from '@/src/types/link/link'

export type RequestGetLinkDetailsResponse = BaseResponse<
  Omit<LinkItem, 'references'> & {
    reference: Omit<ReferenceItem, 'linkCount'>
    why: string
    memo: string
  }
>

export const requestGetLinkDetails = async (
  id: number,
): Promise<RequestGetLinkDetailsResponse> => {
  const res = await axiosInstance.get(`/user-links/${id}`)

  return res.data
}
