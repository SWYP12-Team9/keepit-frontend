import { create } from 'zustand'

interface User {
  name: string
  userId: string | number
  nickname: string
  profileImage: string | null
}

interface AuthState {
  isLoggedIn: boolean
  user: User | null
  login: (userData: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,

  login: (userData) =>
    set({
      isLoggedIn: true,
      user: userData,
    }),

  logout: () =>
    set({
      isLoggedIn: false,
      user: null,
    }),
}))
