import { useAuthStore } from '@/src/store/authStore'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { requestPostLogout } from '../../request/requestPostLogout'

export const useLogout = () => {
  const router = useRouter()
  const logout = useAuthStore((state) => state.logout)

  return useMutation({
    mutationFn: async () => {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) return

      return requestPostLogout({
        body: { refreshToken },
      })
    },

    onSuccess: () => {
      logout()
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('accessToken')
      router.replace('/')
    },

    onError: (error) => {
      console.log(error)
    },
  })
}
