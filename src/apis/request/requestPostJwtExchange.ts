import { BaseResponse } from '@/src/types/response/response'
import { axiosInstance } from '../instance/axiosInstance'

export interface JwtExchangeData {
  accessToken: string
  refreshToken: string
}

export type JwtExchangeResponse = BaseResponse<JwtExchangeData>

export const requestJwtExchange = async (): Promise<JwtExchangeResponse> => {
  const res = await axiosInstance.post('/jwt/exchange', {})
  const body = res.data
  // 서버가 BaseResponse 래핑 없이 토큰을 직접 반환하는 경우 대응
  if (body.data) {
    return body
  }
  return {
    status: res.status,
    message: 'ok',
    data: body,
  } as JwtExchangeResponse
}
