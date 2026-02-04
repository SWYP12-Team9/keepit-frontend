import { useMutation, useQueryClient } from '@tanstack/react-query'
import { requestPatchLink } from '../../request/requestPatchLink'
import { linkKeys } from './linkKeys'
import { AxiosError } from 'axios'
import { useDrawerStore } from '@/src/store/drawerStore'

export const usePatchLinkMutation = () => {
  const queryClient = useQueryClient()
  const resetValues = useDrawerStore((state) => state.resetValues)

  return useMutation({
    mutationFn: requestPatchLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkKeys.lists() })
      queryClient.invalidateQueries({ queryKey: linkKeys.details() })

      resetValues()
    },
    onError: (error: AxiosError) => {
      console.log(error)
    },
  })
}
