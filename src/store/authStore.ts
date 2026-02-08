import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface User {
  userId: string | number
  nickname: string
  profileImage: string | null
}

interface AuthState {
  isLoggedIn: boolean
  user: User | null
  login: (userData: User) => void
  logout: () => void
  setLoggedIn: (status: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,

      login: (userData) =>
        set({
          isLoggedIn: true,
          user: userData,
        }),

      setLoggedIn: (status: boolean) => set({ isLoggedIn: status }),

      logout: () => {
        set({
          isLoggedIn: false,
          user: null,
        })
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
