import { axiosInstance } from '../instance/axiosInstance'

interface RequestPostReissueParams {
  body: {
    refreshToken: string
  }
}

export const requestPostReissue = async ({
  body,
}: RequestPostReissueParams) => {
  const res = await axiosInstance.post('/jwt/refresh', body)
  return res.data
}
