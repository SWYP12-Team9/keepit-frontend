import { useQuery } from '@tanstack/react-query'
import { requestGetReferenceDetails } from '../../request/requestGetReferenceDetails'
import { referenceKeys } from './referenceKeys'

export const useGetReferenceDetails = (id: number | null) => {
  return useQuery({
    queryKey: referenceKeys.detail(id!),
    queryFn: () => requestGetReferenceDetails(id!),
    enabled: !!id,
  })
}
