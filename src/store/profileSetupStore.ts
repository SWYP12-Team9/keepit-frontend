import { create } from 'zustand'

interface ProfileSetupStore {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useProfileSetupStore = create<ProfileSetupStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
