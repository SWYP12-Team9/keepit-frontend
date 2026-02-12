import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAuthStore } from '../../../store/authStore'
import { requestDeleteUser } from '../../request/requestDeleteUser'

export const useDeleteUserMutation = () => {
  const { logout } = useAuthStore()

  return useMutation({
    mutationFn: requestDeleteUser,
    onSuccess: () => {
      logout()
      window.location.href = '/'
    },
    onError: (error: AxiosError) => {
      console.error('회원 탈퇴 실패:', error)
    },
  })
}
