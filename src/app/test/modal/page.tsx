'use client'

import { CreateFolderModal } from '@/src/components/Modal/CreateFolderModal'
import { ProfileModal } from '@/src/components/Modal/ProfileModal'
import { SaveLinkModal } from '@/src/components/Modal/SaveLinkModal'
import { useState } from 'react'
import { FieldValues } from 'react-hook-form'

import { useSaveLinkModalStore } from '@/src/store/saveLinkModalStore'
import { MoveLinkModal } from '@/src/components/Modal/MoveLinkModal'

export default function ModalTest() {
  const onSubmit = (data: FieldValues) => {
    console.log(data)
  }

  const open = useSaveLinkModalStore((state) => state.open)
  const [isCreateFolderModalOpen, setCreateFolderModalOpen] = useState(false)
  const [isProfileModalOpen, setProfileModalOpen] = useState(false)
  const [isMoveLinkModalOpen, setMoveLinkModalOpen] = useState(false)

  const handleCloseMoveLinkModal = () => {
    setMoveLinkModalOpen(false)
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-center gap-20">
        <button onClick={() => open()}>링크 저장 모달 열기</button>

        <button onClick={() => setCreateFolderModalOpen(true)}>
          레퍼런스 폴더 생성 모달 열기
        </button>

        <button onClick={() => setProfileModalOpen(true)}>
          프로필 생성 모달 열기
        </button>
        <button onClick={() => setMoveLinkModalOpen(true)}>
          레퍼런스 폴더 이동 모달 열기
        </button>
      </div>

      <SaveLinkModal />

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
      <MoveLinkModal
        isModalOpen={isMoveLinkModalOpen}
        onClose={handleCloseMoveLinkModal}
        linkId={0}
      />
    </div>
  )
}
