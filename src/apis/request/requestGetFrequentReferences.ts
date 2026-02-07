import { ReferenceItem } from '@/src/types/reference/reference'
import { BaseResponse } from '@/src/types/response/response'
import { axiosInstance } from '../instance/axiosInstance'

export interface RequestGetFrequentReferencesParams {
  cursor?: string | null
  size?: number
}

export type RequestGetFrequentReferencesResponse = BaseResponse<{
  contents: ReferenceItem[]
  nextCursor: string
  hasNext: boolean
}>

export const requestGetFrequentReferences = async ({
  cursor,
  size = 20,
}: RequestGetFrequentReferencesParams): Promise<RequestGetFrequentReferencesResponse> => {
  const res = await axiosInstance.get('/references/frequent', {
    params: {
      cursor,
      size,
    },
  })

  return res.data
}
