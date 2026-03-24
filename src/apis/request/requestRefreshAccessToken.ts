import { useAuthStore } from '@/src/store/authStore'
import { requestPostReissue } from './requestPostReissue'

let refreshPromise: Promise<string | null> | null = null

export const requestRefreshAccessToken = async (): Promise<string | null> => {
  if (typeof window === 'undefined') {
    return null
  }

  if (refreshPromise) {
    return refreshPromise
  }

  refreshPromise = (async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL

    if (!refreshToken || !baseURL) {
      useAuthStore.getState().logout()
      return null
    }

    try {
      const response = await requestPostReissue({
        body: { refreshToken },
      })

      const { accessToken, refreshToken: nextRefreshToken } = response.data

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', nextRefreshToken)

      return accessToken
    } catch {
      useAuthStore.getState().logout()
      return null
    } finally {
      refreshPromise = null
    }
  })()

  return refreshPromise
}
