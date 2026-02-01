'use client'

import { useState } from 'react'
import { SaveLinkModal } from '@/src/components/Modal/SaveLinkModal'
import { FieldValues } from 'react-hook-form'
import { CreateFolderModal } from '@/src/components/Modal/CreateFolderModal'

export default function ModalTest() {
  const onSubmit = (data: FieldValues) => {
    console.log(data)
  }

  const [isSaveLinkModalOpen, setSaveLinkModalOpen] = useState(false)
  const [isCreateFolderModalOpen, setCreateFolderModalOpen] = useState(false)

  return (
    <div className="flex flex-col">
      <div className="flex justify-center gap-20">
        <button onClick={() => setSaveLinkModalOpen(true)}>
          링크 저장 모달 열기
        </button>

        <button onClick={() => setCreateFolderModalOpen(true)}>
          레퍼런스 폴더 생성 모달 열기
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
    </div>
  )
}
