'use client'

import { linkKeys } from '@/src/apis/query/link/linkKeys'
import { requestGetLinkDetails } from '@/src/apis/request/requestGetLinkDetails'
import { useDrawerStore } from '@/src/store/drawerStore'
import { useQueryClient } from '@tanstack/react-query'

export function useOpenLinkDrawer() {
  const queryClient = useQueryClient()
  const setLinkId = useDrawerStore((state) => state.setLinkId)
  const openDrawer = useDrawerStore((state) => state.open)

  const openLinkDrawer = async (id: number) => {
    await queryClient.fetchQuery({
      queryKey: linkKeys.detail(id),
      queryFn: () => requestGetLinkDetails(id),
    })

    setLinkId(id)
    openDrawer()

    void queryClient.invalidateQueries({
      queryKey: linkKeys.lists(),
    })
  }

  return { openLinkDrawer }
}
