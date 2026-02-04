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

export const requestPostSaveLink = async (
  params: RequestPostSaveLinkParams,
) => {
  const res = await axiosInstance.post('/user-links', params)

  return res.data
}
