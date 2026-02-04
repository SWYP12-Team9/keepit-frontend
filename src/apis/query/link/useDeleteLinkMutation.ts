import { useMutation, useQueryClient } from '@tanstack/react-query'
import { requestDeleteLink } from '../../request/requestDeleteLink'
import { linkKeys } from './linkKeys'
import { AxiosError } from 'axios'

export const useDeleteLinkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: requestDeleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkKeys.lists() })
    },
    onError: (error: AxiosError) => {
      console.log(error)
    },
  })
}
