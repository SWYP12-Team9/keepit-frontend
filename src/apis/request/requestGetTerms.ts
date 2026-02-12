import { axiosInstance } from '../instance/axiosInstance'

export const requestGetServiceTerms = async () => {
  const res = await axiosInstance.get('/terms/service')
  return res.data
}

export const requestGetPrivacyTerms = async () => {
  const res = await axiosInstance.get('/terms/privacy')
  return res.data
}
