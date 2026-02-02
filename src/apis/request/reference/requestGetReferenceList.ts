import { axiosInstance } from '../../instance/axiosInstance'
import {
  RequestGetReferenceListParams,
  RequestGetReferenceListResponse,
} from './requestGetReferenceListTypes'

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
