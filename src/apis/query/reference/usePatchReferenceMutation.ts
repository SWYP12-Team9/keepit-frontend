import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { requestPatchReference } from '../../request/requestPatchReference'
import { referenceKeys } from './referenceKeys'

export const usePatchReferenceMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: requestPatchReference,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: referenceKeys.lists() })
      queryClient.invalidateQueries({ queryKey: referenceKeys.details() })
      queryClient.invalidateQueries({
        queryKey: referenceKeys.frequentInfinite(),
      })
    },
    onError: (error: AxiosError) => {
      console.log(error)
    },
  })
}
