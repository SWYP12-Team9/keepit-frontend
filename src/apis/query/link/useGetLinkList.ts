import { useQuery } from '@tanstack/react-query'
import {
  requestGetLinkList,
  RequestGetLinkListParams,
} from '../../request/requestGetLinkList'
import { linkKeys } from './linkKeys'

interface UseGetLinkListOptions {
  enabled?: boolean
}

export const useGetLinkList = (
  { referenceId }: RequestGetLinkListParams,
  options?: UseGetLinkListOptions,
) => {
  return useQuery({
    queryKey: linkKeys.list(referenceId),
    queryFn: () => requestGetLinkList({ referenceId }),
    enabled: options?.enabled ?? true,
  })
}
