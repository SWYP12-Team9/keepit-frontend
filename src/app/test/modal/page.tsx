'use client'

import { useState } from 'react'
import { SaveLinkModal } from '@/src/components/Modal/SaveLinkModal'
import { FieldValues } from 'react-hook-form'

export default function ModalTest() {
  const onSubmit = (data: FieldValues) => {
    console.log(data)
  }

  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <div className="flex flex-col">
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
      <SaveLinkModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        onSubmit={onSubmit}
      />
    </div>
  )
}
