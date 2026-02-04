import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { requestPostUserProfile } from '../../request/requestPostUserProfile'
import { userKeys } from './userKeys'

export const usePostProfileMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: requestPostUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
    onError: (error: AxiosError) => {
      console.error('프로필 설정 실패:', error)
    },
  })
}
