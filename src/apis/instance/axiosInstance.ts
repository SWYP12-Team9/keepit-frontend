import { useAuthStore } from '@/src/store/authStore'
import { useProfileSetupStore } from '@/src/store/profileSetupStore'
import axios from 'axios'
import { requestPostReissue } from '../request/requestPostReissue'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken')

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)

let isRefreshing = false
let failedQueue: {
  resolve: (token: string) => void
  reject: (error: unknown) => void
}[] = []

const processQueue = (error: unknown, token?: string) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else if (token) {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 403 &&
      error.response?.data?.code === 'USR007'
    ) {
      useProfileSetupStore.getState().open()
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem('refreshToken')

      if (!refreshToken) {
        useAuthStore.getState().logout()
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(axiosInstance(originalRequest))
            },
            reject,
          })
        })
      }

      isRefreshing = true

      try {
        const res = await requestPostReissue({
          body: { refreshToken },
        })

        const { accessToken, refreshToken: newRefreshToken } = res.data

        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', newRefreshToken)

        processQueue(null, accessToken)

        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return axiosInstance(originalRequest)
      } catch (reissueError) {
        processQueue(reissueError)
        useAuthStore.getState().logout()
        return Promise.reject(reissueError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)
