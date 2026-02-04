import { axiosInstance } from '../instance/axiosInstance'

export interface JwtExchangeResponse {
  accessToken: string
  refreshToken: string
}

export const requestJwtExchange = async (): Promise<JwtExchangeResponse> => {
  const res = await axiosInstance.post('/jwt/exchange', {})
  return res.data
}
