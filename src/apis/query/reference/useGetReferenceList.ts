import { useQuery } from '@tanstack/react-query'
import {
  requestGetReferenceList,
  RequestGetReferenceListParams,
} from '../../request/requestGetReferenceList'
import { referenceKeys } from './referenceKeys'

export const useGetReferenceList = ({
  type,
  sortBy,
}: RequestGetReferenceListParams) => {
  return useQuery({
    queryKey: referenceKeys.list(type),
    queryFn: () => requestGetReferenceList({ type }),
  })
}
