import { axiosInstance } from '../instance/axiosInstance'

interface RequestPatchLinkParams {
  userLinkId: number
  body: {
    why?: string
    memo?: string
    referenceId?: number
    moveToDefault?: boolean
  }
}

export const requestPatchLink = async ({
  userLinkId,
  body,
}: RequestPatchLinkParams) => {
  const res = await axiosInstance.patch(`/user-links/${userLinkId}`, body)

  return res.data
}
