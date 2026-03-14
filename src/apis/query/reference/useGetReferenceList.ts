import { ReferenceVisibility } from '@/src/types/reference/reference'
import { useInfiniteQuery } from '@tanstack/react-query'
import { requestGetReferenceList } from '../../request/requestGetReferenceList'
import { referenceKeys } from './referenceKeys'

interface UseGetReferenceListParams {
  type: ReferenceVisibility
  size?: number
  enabled?: boolean
}

export const useGetReferenceList = ({
  type,
  size = 20,
  enabled = true,
}: UseGetReferenceListParams) => {
  return useInfiniteQuery({
    queryKey: referenceKeys.listInfinite({ type, size }),

    queryFn: ({ pageParam }) =>
      requestGetReferenceList({
        type,
        cursor: pageParam,
        size,
      }),

    initialPageParam: null as string | null,
    enabled,

    getNextPageParam: (lastPage) => {
      const { hasNext, nextCursor } = lastPage.data
      return hasNext ? nextCursor : null
    },
  })
}
