import { useMutation, useQueryClient } from '@tanstack/react-query'
import { requestPostSaveLink } from '../../request/requestPostSaveLink'
import { AxiosError } from 'axios'
import { referenceKeys } from '../reference/referenceKeys'
import { linkKeys } from './linkKeys'

export const useSaveLinkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: requestPostSaveLink,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: referenceKeys.lists() })
      queryClient.invalidateQueries({ queryKey: linkKeys.lists() })
    },
    onError: (error: AxiosError) => {
      console.log(error)
    },
  })
}
