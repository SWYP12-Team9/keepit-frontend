import { BaseResponse } from '@/src/types/response/response'
import { axiosInstance } from '../instance/axiosInstance'

export interface UserInfo {
  userId: number
  nickname: string
  introduction: string
  profileImageUrl: string | null
  backgroundImageUrl: string | null
}

export type RequestGetUserInfoResponse = BaseResponse<UserInfo>

export const requestGetUserInfo =
  async (): Promise<RequestGetUserInfoResponse> => {
    const res = await axiosInstance.get('/users/info')
    return res.data
  }
