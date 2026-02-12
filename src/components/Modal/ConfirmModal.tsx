'use client'

import { Modal } from './Modal'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = '삭제',
  cancelText = '취소',
}: ConfirmModalProps) {
  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation()
    onConfirm()
  }
  return (
    <Modal
      isOpen={isOpen}
      width="w-270"
      className="flex flex-col items-center px-16 pt-20"
    >
      <div className="mb-21 flex flex-col items-center gap-16 text-center">
        <h2 className="text-body">{title}</h2>
        {description && (
          <p className="text-body-4 text-black/70">{description}</p>
        )}
      </div>
      <div className="flex w-full gap-7 px-10">
        <button
          className="text-gray-disbled text-body-4 rounded-10 h-31 flex-1 cursor-pointer bg-[#E9E9E9]"
          onClick={handleCancel}
        >
          {cancelText}
        </button>
        <button
          className="text-body-4 rounded-10 h-31 flex-1 cursor-pointer bg-[#EC1313]/15 text-[#EC1313]"
          onClick={handleConfirm}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  )
}
