'use client'

import { CreateFolderModal } from '@/src/components/Modal/CreateFolderModal'
import { ProfileModal } from '@/src/components/Modal/ProfileModal'
import { SaveLinkModal } from '@/src/components/Modal/SaveLinkModal'
import { useState } from 'react'
import { FieldValues } from 'react-hook-form'

export default function ModalTest() {
  const onSubmit = (data: FieldValues) => {
    console.log(data)
  }

  const [isSaveLinkModalOpen, setSaveLinkModalOpen] = useState(false)
  const [isCreateFolderModalOpen, setCreateFolderModalOpen] = useState(false)
  const [isProfileModalOpen, setProfileModalOpen] = useState(false)

  return (
    <div className="flex flex-col">
      <div className="flex justify-center gap-20">
        <button onClick={() => setSaveLinkModalOpen(true)}>
          링크 저장 모달 열기
        </button>

        <button onClick={() => setCreateFolderModalOpen(true)}>
          레퍼런스 폴더 생성 모달 열기
        </button>

        <button onClick={() => setProfileModalOpen(true)}>
          프로필 생성 모달 열기
        </button>
      </div>

      <SaveLinkModal
        isModalOpen={isSaveLinkModalOpen}
        setModalOpen={setSaveLinkModalOpen}
        onSubmit={onSubmit}
      />

      <CreateFolderModal
        isModalOpen={isCreateFolderModalOpen}
        setModalOpen={setCreateFolderModalOpen}
        onSubmit={onSubmit}
      />

      <ProfileModal
        isModalOpen={isProfileModalOpen}
        setModalOpen={setProfileModalOpen}
        onSubmit={onSubmit}
      />
    </div>
  )
}
