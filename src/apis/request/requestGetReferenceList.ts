import { BaseResponse } from '@/src/types/response/response'
import { axiosInstance } from '../instance/axiosInstance'
import {
  ReferenceItem,
  ReferenceSortBy,
  ReferenceVisibility,
} from '@/src/types/reference/reference'

export interface RequestGetReferenceListParams {
  type?: ReferenceVisibility
  sortBy?: ReferenceSortBy
  cursor?: string
  size?: number
}

export type RequestGetReferenceListResponse = BaseResponse<{
  contents: ReferenceItem[]
  nextCursor: string
  hasNext: boolean
}>

export const requestGetReferenceList = async ({
  type,
  sortBy,
  cursor,
  size,
}: RequestGetReferenceListParams): Promise<RequestGetReferenceListResponse> => {
  const res = await axiosInstance.get('/references', {
    params: {
      type,
      sortBy,
      cursor,
      size,
    },
  })

  return res.data
}
