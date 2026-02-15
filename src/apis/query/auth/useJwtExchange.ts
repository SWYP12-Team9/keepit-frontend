import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { requestJwtExchange } from '../../request/requestPostJwtExchange'

export const useJwtExchangeMutation = () => {
  return useMutation({
    mutationFn: requestJwtExchange,
    onError: (error: AxiosError) => {
      console.error('토큰 교환 실패:', error)
    },
  })
}
