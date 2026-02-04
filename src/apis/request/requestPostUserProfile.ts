import { axiosInstance } from '../instance/axiosInstance'

export interface ProfileData {
  nickname: string
  introduction: string
}

export interface RequestPostUserProfileParams {
  profile: ProfileData
  profileImage?: File | null
  backgroundImage?: File | null
}

export const requestPostUserProfile = async ({
  profile,
  profileImage,
  backgroundImage,
}: RequestPostUserProfileParams) => {
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

  const res = await axiosInstance.post('/users/profile/complete', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data
}
