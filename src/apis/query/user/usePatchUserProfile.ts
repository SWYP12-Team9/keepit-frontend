import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { requestPatchUseProfile } from '../../request/requestPatchUserProfile'
import { userKeys } from './userKeys'

export const usePatchUserProfileMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: requestPatchUseProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.info() })
    },
    onError: (error: AxiosError) => {
      console.log(error)
    },
  })
}
