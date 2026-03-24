import { BaseResponse } from '@/src/types/response/response'
import { refreshAxiosInstance } from '../instance/refreshAxiosInstance'

interface RequestPostReissueParams {
  body: {
    refreshToken: string
  }
}

interface ReissueTokenData {
  accessToken: string
  refreshToken: string
}

export type RequestPostReissueResponse = BaseResponse<ReissueTokenData>

export const requestPostReissue = async ({
  body,
}: RequestPostReissueParams): Promise<RequestPostReissueResponse> => {
  const res = await refreshAxiosInstance.post('/jwt/refresh', body)

  return res.data
}
