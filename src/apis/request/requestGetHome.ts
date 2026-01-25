import { axiosInstance } from '../instance/axiosInstance'

export const requestGetHome = async () => {
  const res = await axiosInstance.get('/api/home')

  return res.data
}
