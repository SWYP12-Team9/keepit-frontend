import { LinkItem } from '@/src/types/link/link'
import { BaseResponse } from '@/src/types/response/response'
import { axiosInstance } from '../instance/axiosInstance'

interface BaseSaveLinkParams {
  why: string
  url: string
  memo: string
}

interface NewReferenceParams extends BaseSaveLinkParams {
  newReference: {
    title: string
    colorCode: string
  }
}

interface ExistingReferenceParams extends BaseSaveLinkParams {
  referenceId: number
}

export type RequestPostSaveLinkParams =
  | NewReferenceParams
  | ExistingReferenceParams
  | BaseSaveLinkParams

export type RequestPostSaveLinkResponse = BaseResponse<
  LinkItem & {
    why: string
    memo: string
  }
>

export const requestPostSaveLink = async (
  params: RequestPostSaveLinkParams,
) => {
  const res = await axiosInstance.post('/user-links', params)

  return res.data as RequestPostSaveLinkResponse
}
