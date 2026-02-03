import { useQuery } from '@tanstack/react-query'
import {
  requestGetLinkList,
  RequestGetLinkListParams,
} from '../../request/requestGetLinkList'
import { linkKeys } from './linkKeys'

export const useGetLinkList = ({ referenceId }: RequestGetLinkListParams) => {
  return useQuery({
    queryKey: linkKeys.list(referenceId),
    queryFn: () => requestGetLinkList({ referenceId }),
  })
}
