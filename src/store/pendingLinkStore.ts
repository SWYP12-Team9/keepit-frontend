import { LinkItem } from '@/src/types/link/link'
import { create } from 'zustand'

export interface PendingLinkItem extends LinkItem {
  status: 'PROCESSING'
  why?: string
  memo?: string
  createdAt: number
}

interface PendingLinkStore {
  pendingLinks: PendingLinkItem[]
  isCreationPopupDismissed: boolean
  addPendingLink: (link: Omit<PendingLinkItem, 'createdAt'>) => void
  removePendingLink: (id: number) => void
  dismissCreationPopup: () => void
  resetCreationPopup: () => void
}

export const usePendingLinkStore = create<PendingLinkStore>((set) => ({
  pendingLinks: [],
  isCreationPopupDismissed: false,
  addPendingLink: (link) =>
    set((state) => {
      const nextLinks = state.pendingLinks.filter((item) => item.id !== link.id)

      return {
        pendingLinks: [
          {
            ...link,
            createdAt: Date.now(),
          },
          ...nextLinks,
        ],
        isCreationPopupDismissed: false,
      }
    }),
  removePendingLink: (id) =>
    set((state) => ({
      pendingLinks: state.pendingLinks.filter((item) => item.id !== id),
    })),
  dismissCreationPopup: () => set({ isCreationPopupDismissed: true }),
  resetCreationPopup: () => set({ isCreationPopupDismissed: false }),
}))
