import { create } from 'zustand'

interface DrawerStore {
  isOpen: boolean
  isClosing: boolean
  open: () => void
  close: () => void

  why: string
  memo: string
  setWhy: (why: string) => void
  setMemo: (memo: string) => void
  initialWhy: string
  initialMemo: string

  initializeValues: ({ why, memo }: { why: string; memo: string }) => void
  resetValues: () => void
}

export const useDrawerStore = create<DrawerStore>((set) => ({
  isOpen: false,
  isClosing: false,
  open: () => set({ isOpen: true }),
  close: () => {
    set({ isClosing: true })
    setTimeout(() => {
      set({ isOpen: false, isClosing: false })
    }, 300)
  },

  why: '',
  memo: '',
  initialWhy: '',
  initialMemo: '',

  setWhy: (why: string) => set({ why }),
  setMemo: (memo: string) => set({ memo }),

  initializeValues: ({ why, memo }) =>
    set({ why, memo, initialWhy: why, initialMemo: memo }),

  resetValues: () => set({ why: '', memo: '' }),
}))
