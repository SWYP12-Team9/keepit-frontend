import { useQuery } from '@tanstack/react-query'
import { requestGetReferenceList } from '../../request/reference/requestGetReferenceList'
import { referenceKeys } from './referenceKeys'

export const useGetReferenceList = () => {
  return useQuery({
    queryKey: referenceKeys.list('all'),
    queryFn: () => requestGetReferenceList({}),
  })
}
