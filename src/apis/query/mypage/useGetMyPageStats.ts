import { useQuery } from '@tanstack/react-query'
import { requestGetMyPageStats } from '../../request/requestGetMypageStats'
import { myPageKeys } from './mypageKeys'

interface UseGetMyPageStatsOptions {
  enabled?: boolean
}

export const useGetMyPageStats = (options?: UseGetMyPageStatsOptions) => {
  return useQuery({
    queryKey: myPageKeys.stats(),
    queryFn: requestGetMyPageStats,
    enabled: options?.enabled ?? true,
  })
}
