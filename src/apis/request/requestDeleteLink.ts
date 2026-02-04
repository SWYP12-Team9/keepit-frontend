import { axiosInstance } from '../instance/axiosInstance'

export const requestDeleteLink = async (id: number) => {
  const res = await axiosInstance.delete(`/user-links/${id}`)

  return res.data
}
