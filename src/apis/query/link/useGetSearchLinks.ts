import { useQuery } from '@tanstack/react-query'
import {
  requestGetSearchLinks,
  RequestGetSearchLinksParams,
} from '../../request/requestGetSearchLinks'
import { linkKeys } from './linkKeys'

export const useGetSearchLinks = (params: RequestGetSearchLinksParams) => {
  return useQuery({
    queryKey: linkKeys.search(params),
    queryFn: () => requestGetSearchLinks(params),
    enabled: !!params.keyword && params.keyword.trim().length > 0,
  })
}
