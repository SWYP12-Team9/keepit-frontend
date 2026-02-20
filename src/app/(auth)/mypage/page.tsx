'use client'

import { useGetMyPageStats } from '@/src/apis/query/mypage/useGetMyPageStats'
import { useGetUserInfo } from '@/src/apis/query/user/useGetUserInfo'
import { usePatchUserProfileMutation } from '@/src/apis/query/user/usePatchUserProfile'
import { ProfileModal } from '@/src/components/Modal/ProfileModal'
import { useAuthStore } from '@/src/store/authStore'
import Image from 'next/image'
import { useState } from 'react'
import { ReadStateCard } from './_components/ReadStateCard/ReadStateCard'
import { SavePatternCard } from './_components/SavePatternCard/SavePatternCard'
import { TopReferencesCard } from './_components/TopReferenceCard/TopReferenceCard'
export default function MyPage() {
  const { isLoggedIn } = useAuthStore()
  const {
    data: userStats,
    isLoading,
    error,
  } = useGetMyPageStats({
    enabled: isLoggedIn,
  })
  const { mutate: updateProfile } = usePatchUserProfileMutation()
  const { data: userInfo } = useGetUserInfo({ enabled: isLoggedIn })
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  if (!isLoggedIn) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-600">로그인이 필요합니다</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="h-full bg-gray-50 p-16 md:p-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-24 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-20 h-400 animate-pulse bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !userStats?.data || !userInfo?.data) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-600">
          데이터를 불러올 수 없습니다. 로그인이 필요할 수 있습니다.
        </p>
      </div>
    )
  }

  const handleProfileSubmit = (data: {
    profile: { nickname: string; introduction: string }
    profileImage?: File | null
    backgroundImage?: File | null
  }) => {
    updateProfile(
      {
        profile: data.profile,
        profileImage: data.profileImage,
        backgroundImage: data.backgroundImage,
      },
      {
        onSuccess: () => {
          setIsProfileModalOpen(false)
        },
      },
    )
  }

  const { topReferences, readState, savePattern } = userStats.data

  return (
    <div className="h-full min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
      <div className="mx-auto flex min-h-full w-full max-w-[1280px] flex-col">
        {/* 배경 이미지 섹션 */}
        <div className="relative h-[180px] w-full shrink-0 px-16 pt-16 md:h-[200px] md:px-29 md:pt-29">
          <div className="rounded-20 relative h-full w-full overflow-hidden">
            <Image
              src={
                userInfo.data.backgroundImageUrl ||
                '/images/defaultBackground.png'
              }
              alt="배경이미지"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 프로필 및 통계 카드 섹션 */}
        <div className="px-16 md:px-24">
          <div className="relative -mt-42 mb-32 ml-0 md:-mt-50 md:ml-50">
            <div className="relative mb-18 w-fit">
              <div className="relative h-75 w-75 overflow-hidden rounded-full border-4 border-white bg-white">
                <Image
                  src={
                    userInfo.data.profileImageUrl ||
                    '/images/defaultProfile.png'
                  }
                  alt="프로필"
                  fill
                  className="object-cover"
                />
              </div>

              <button className="absolute -right-8 bottom-0 flex h-32 w-32 items-center justify-center">
                <Image
                  src="/icons/circle-camera.svg"
                  alt="편집"
                  width={24}
                  height={24}
                />
              </button>
            </div>

            <div className="mb-10 flex min-w-0 items-center gap-12">
              <h1 className="text-heading-3 text-gray-default truncate">
                {userInfo.data.nickname}
              </h1>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="cursor-pointer"
              >
                <Image
                  src="/icons/profile-edit.svg"
                  alt="편집"
                  width={19}
                  height={19}
                />
              </button>
            </div>

            <p className="text-body-2 text-gray-default mb-32 break-words">
              {userInfo.data.introduction || '반갑습니다'}
            </p>

            <div className="grid grid-cols-1 gap-19 pb-40 lg:grid-cols-2 xl:grid-cols-3">
              <TopReferencesCard data={topReferences} />
              <ReadStateCard data={readState} />
              <SavePatternCard data={savePattern} />
            </div>
          </div>
        </div>
      </div>
      <ProfileModal
        isModalOpen={isProfileModalOpen}
        setModalOpen={setIsProfileModalOpen}
        onSubmit={handleProfileSubmit}
        initialData={{
          nickname: userInfo.data.nickname || '',
          introduction: userInfo.data.introduction || '',
          profileImageUrl: userInfo.data.profileImageUrl || '',
          backgroundImageUrl: userInfo.data.backgroundImageUrl || '',
        }}
      />
    </div>
  )
}
