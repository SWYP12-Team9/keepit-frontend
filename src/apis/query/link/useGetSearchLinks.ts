import { useQuery } from '@tanstack/react-query'
import {
  requestGetSearchLinks,
  RequestGetSearchLinksParams,
} from '../../request/requestGetSearchLinks'
import { linkKeys } from './linkKeys'

interface UseGetSearchLinksOptions {
  enabled?: boolean
}

export const useGetSearchLinks = (
  params: RequestGetSearchLinksParams,
  options?: UseGetSearchLinksOptions,
) => {
  return useQuery({
    queryKey: linkKeys.search(params),
    queryFn: () => requestGetSearchLinks(params),
    enabled:
      (options?.enabled ?? true) &&
      !!params.keyword &&
      params.keyword.trim().length > 0,
  })
}
