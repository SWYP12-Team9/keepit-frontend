import { useInfiniteQuery } from '@tanstack/react-query'
import {
  requestGetOtherUserLinkList,
  RequestGetOtherUserLinkListParams,
} from '../../request/requestGetOtherUserLinkList'
import { recommendationKeys } from './recommendationKeys'

export const useGetOtherUserLinkList = (
  params: Omit<RequestGetOtherUserLinkListParams, 'cursor'>,
) => {
  return useInfiniteQuery({
    queryKey: recommendationKeys.otherUserLinkList(params),
    queryFn: ({ pageParam }) =>
      requestGetOtherUserLinkList({ ...params, cursor: pageParam }),
    initialPageParam: null as string | number | null,
    getNextPageParam: (lastPage) => {
      const { hasNext, nextCursor } = lastPage.data
      return hasNext ? nextCursor : undefined
    },
  })
}
