import { useDeleteUserMutation } from '@/src/apis/query/user/useDeleteUser'
import { useGetUserInfo } from '@/src/apis/query/user/useGetUserInfo'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '../Button'
import { Modal } from './Modal'
import { TermsModal } from './TermsModal'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { data: userInfo } = useGetUserInfo()
  const { mutate: deleteUser } = useDeleteUserMutation()
  const [termsModalOpen, setTermsModalOpen] = useState(false)
  const [termsType, setTermsType] = useState<'terms' | 'privacy'>('terms')

  const handleWithdrawal = () => {
    deleteUser()
  }

  const handleTermsClick = () => {
    setTermsType('terms')
    setTermsModalOpen(true)
  }

  const handlePrivacyClick = () => {
    setTermsType('privacy')
    setTermsModalOpen(true)
  }

  return (
    <>
      <Modal isOpen={isOpen} width="w-710" className="p-8">
        <div className="flex flex-col px-50 pt-50 pb-32">
          <h2 className="text-heading-3 mb-24 text-center">설정</h2>

          <div className="mb-6 flex items-center justify-between rounded-2xl bg-[#E8ECFF] px-24 py-16">
            <div className="flex items-center gap-4">
              <div className="flex h-52 w-52 items-center justify-center rounded-full">
                <Image
                  src={
                    userInfo?.data.profileImageUrl ||
                    '/images/defaultProfile.png'
                  }
                  alt="profile"
                  width={52}
                  height={52}
                />
              </div>

              <div className="flex flex-col">
                <p className="text-body">{userInfo?.data.nickname}</p>
              </div>
            </div>

            <div className="flex items-center gap-20">
              <div className="bg-blue-normal-active h-36 w-px" />
              <div className="flex h-44 w-44 items-center justify-center rounded-full bg-[#FEE500]">
                <Image
                  src="/icons/kakao.svg"
                  alt="kakao"
                  width={44}
                  height={44}
                />
              </div>
            </div>
          </div>

          <div className="text-body-2 mb-4 flex cursor-pointer items-center justify-center gap-16 pt-16">
            <button onClick={handleTermsClick}>서비스 이용약관</button>
            <span className="text-gray-muted">|</span>
            <button onClick={handlePrivacyClick}>개인정보 처리방침</button>
          </div>

          <div className="mb-34 flex justify-center pt-35">
            <button
              onClick={handleWithdrawal}
              className="text-body-2 text-gray-disabled cursor-pointer underline"
            >
              회원 탈퇴
            </button>
          </div>

          <div className="flex justify-center">
            <Button
              variant="tertiary"
              onClick={onClose}
              width="w-140"
              height="h-38"
              className="cursor-pointer text-white"
            >
              완료
            </Button>
          </div>
        </div>
      </Modal>

      <TermsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        type={termsType}
      />
    </>
  )
}
