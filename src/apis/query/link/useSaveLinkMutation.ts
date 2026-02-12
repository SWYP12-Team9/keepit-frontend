import { showErrorToast } from '@/src/utils/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { requestPostSaveLink } from '../../request/requestPostSaveLink'
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
      if (error.response?.status === 409) {
        showErrorToast('이미 저장된 링크입니다.')
      } else {
        showErrorToast('저장에 실패했어요. 잠시 후 다시 시도해주세요.')
      }
    },
  })
}
