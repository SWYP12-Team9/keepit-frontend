import { create } from 'zustand'

interface SaveLinkModalStore {
  url: string
  isOpen: boolean
  setUrl: (url: string) => void
  open: (url?: string) => void
  close: () => void
}

export const useSaveLinkModalStore = create<SaveLinkModalStore>((set) => ({
  url: '',
  isOpen: false,
  setUrl: (url) => set({ url }),
  open: (url) => set({ isOpen: true, url: url ?? '' }),
  close: () => set({ isOpen: false, url: '' }),
}))
