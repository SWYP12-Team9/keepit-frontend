import { useQuery } from '@tanstack/react-query'
import { requestGetUserInfo } from '../../request/requestGetUserInfo'
import { userKeys } from './userKeys'

interface UseGetUserInfoOptions {
  enabled?: boolean
}

export const useGetUserInfo = (options?: UseGetUserInfoOptions) => {
  return useQuery({
    queryKey: userKeys.info(),
    queryFn: requestGetUserInfo,
    enabled: options?.enabled ?? true,
  })
}
