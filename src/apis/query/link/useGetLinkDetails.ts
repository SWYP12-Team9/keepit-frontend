import { useQuery } from '@tanstack/react-query'
import { linkKeys } from './linkKeys'
import { requestGetLinkDetails } from '../../request/requestGetLinkDetails'

export const useGetLinkDetails = (id: number | null) => {
  return useQuery({
    queryKey: linkKeys.detail(id!),
    queryFn: () => requestGetLinkDetails(id!),
    enabled: !!id,
  })
}
