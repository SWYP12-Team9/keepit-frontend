import { showErrorToast } from '@/src/utils/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import {
  requestPostSaveLink,
  RequestPostSaveLinkResponse,
} from '../../request/requestPostSaveLink'
import { usePendingLinkStore } from '@/src/store/pendingLinkStore'
import { referenceKeys } from '../reference/referenceKeys'

export const useSaveLinkMutation = () => {
  const queryClient = useQueryClient()
  const addPendingLink = usePendingLinkStore((state) => state.addPendingLink)

  return useMutation({
    mutationFn: requestPostSaveLink,
    onSuccess: (response: RequestPostSaveLinkResponse, variables) => {
      const savedLink = response.data

      queryClient.invalidateQueries({ queryKey: referenceKeys.lists() })

      addPendingLink({
        id: savedLink.id,
        reference: savedLink.reference,
        url: variables.url,
      })
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        showErrorToast('이미 저장된 링크입니다.')
      } else {
        showErrorToast('저장에 실패했어요. 잠시 후 다시 시도해주세요.')
      }
    },
  })
}
