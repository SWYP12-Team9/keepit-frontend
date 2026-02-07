import { ReferenceItem } from '@/src/types/reference/reference'
import { BaseResponse } from '@/src/types/response/response'
import { axiosInstance } from '../instance/axiosInstance'

export type requestGetReferenceDetailsResponse = BaseResponse<
  ReferenceItem & {
    description: string
    isPublic: boolean
  }
>
export const requestGetReferenceDetails = async (
  id: number,
): Promise<requestGetReferenceDetailsResponse> => {
  const res = await axiosInstance.get(`/references/${id}`)

  return res.data
}
