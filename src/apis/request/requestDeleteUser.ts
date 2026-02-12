import { axiosInstance } from '../instance/axiosInstance'

export const requestDeleteUser = async () => {
  const res = await axiosInstance.delete('/users')
  return res.data
}
