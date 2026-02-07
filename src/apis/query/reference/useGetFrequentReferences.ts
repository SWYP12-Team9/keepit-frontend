import { useInfiniteQuery } from '@tanstack/react-query'
import { requestGetFrequentReferences } from '../../request/requestGetFrequentReferences'
import { referenceKeys } from './referenceKeys'

export const useGetFrequentReferences = (size = 20) => {
  return useInfiniteQuery({
    queryKey: referenceKeys.frequentInfinite(),

    queryFn: ({ pageParam }) =>
      requestGetFrequentReferences({
        cursor: pageParam,
        size,
      }),

    initialPageParam: null as string | null,

    getNextPageParam: (lastPage) => {
      const { hasNext, nextCursor } = lastPage.data
      return hasNext ? nextCursor : null
    },
  })
}
