import { create } from 'zustand'

interface SettingModalState {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useSettingModalStore = create<SettingModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
