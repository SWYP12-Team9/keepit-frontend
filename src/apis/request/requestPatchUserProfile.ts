import { axiosInstance } from '../instance/axiosInstance'

export interface ProfileData {
  nickname: string
  introduction: string
}

export interface RequestPatchUserProfileParams {
  profile: ProfileData
  profileImage?: File | null
  backgroundImage?: File | null
}

export const requestPatchUseProfile = async ({
  profile,
  profileImage,
  backgroundImage,
}: RequestPatchUserProfileParams) => {
  const formData = new FormData()

  const profileBlob = new Blob([JSON.stringify(profile)], {
    type: 'application/json',
  })
  formData.append('profile', profileBlob)

  if (profileImage) {
    formData.append('profileImage', profileImage)
  }
  if (backgroundImage) {
    formData.append('backgroundImage', backgroundImage)
  }

  const res = await axiosInstance.patch('/users/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data
}
