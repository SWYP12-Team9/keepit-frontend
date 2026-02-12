import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { requestPatchLink } from '../../request/requestPatchLink'
import { linkKeys } from './linkKeys'

export const usePatchLinkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: requestPatchLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkKeys.lists() })
      queryClient.invalidateQueries({ queryKey: linkKeys.details() })
    },
    onError: (error: AxiosError) => {
      console.log(error)
    },
  })
}
