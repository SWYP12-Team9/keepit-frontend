import { BaseResponse } from '@/src/types/response/response'
import { axiosInstance } from '../instance/axiosInstance'

export type RequestGetCategoriesResponse = BaseResponse<string[]>

export const requestGetCategories =
  async (): Promise<RequestGetCategoriesResponse> => {
    const res = await axiosInstance.get('/recommendations/categories')

    return res.data
  }
