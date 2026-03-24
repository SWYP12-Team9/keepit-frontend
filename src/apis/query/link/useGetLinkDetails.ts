import { useQuery } from '@tanstack/react-query'
import { linkKeys } from './linkKeys'
import { requestGetLinkDetails } from '../../request/requestGetLinkDetails'

export const LINK_DETAIL_STALE_TIME = 30_000

export const useGetLinkDetails = (id: number | null) => {
  return useQuery({
    queryKey: linkKeys.detail(id!),
    queryFn: () => requestGetLinkDetails(id!),
    enabled: !!id,
    staleTime: LINK_DETAIL_STALE_TIME,
  })
}
