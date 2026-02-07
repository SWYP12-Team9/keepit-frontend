import { useQuery } from '@tanstack/react-query'
import { requestGetUserInfo } from '../../request/requestGetUserInfo'
import { userKeys } from './userKeys'

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: userKeys.info(),
    queryFn: requestGetUserInfo,
  })
}
