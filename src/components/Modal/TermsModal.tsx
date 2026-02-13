import {
  useGetPrivacyTerms,
  useGetServiceTerms,
} from '@/src/apis/query/terms/useGetTerms'
import Image from 'next/image'
import { Modal } from './Modal'

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'terms' | 'privacy'
}

export function TermsModal({ isOpen, onClose, type }: TermsModalProps) {
  const { data: serviceTermsResponse, isLoading: isServiceLoading } =
    useGetServiceTerms()
  const { data: privacyTermsResponse, isLoading: isPrivacyLoading } =
    useGetPrivacyTerms()

  const isLoading = type === 'terms' ? isServiceLoading : isPrivacyLoading
  const termsData =
    type === 'terms' ? serviceTermsResponse?.data : privacyTermsResponse?.data

  return (
    <Modal
      isOpen={isOpen}
      width="w-780"
      height="h-[80vh]"
      className="rounded-20 p-24"
    >
      <button
        onClick={onClose}
        className="absolute top-24 right-24 flex h-24 w-24 cursor-pointer items-center justify-center"
        aria-label="close"
      >
        <Image src="/icons/close.svg" alt="close" width={30} height={30} />
      </button>
      <div className="flex h-full flex-col">
        <div className="mb-4">
          <h2 className="text-heading-3">{termsData?.title}</h2>
          {termsData?.effectiveDate && (
            <p className="text-body-1 text-gray-default mt-1">
              시행일: {termsData.effectiveDate}
            </p>
          )}
        </div>

        <div className="text-body-2 text-gray-default mb-6 flex-1 overflow-y-auto leading-relaxed">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-default">로딩 중...</p>
            </div>
          ) : (
            <div className="whitespace-pre-wrap">{termsData?.content}</div>
          )}
        </div>
      </div>
    </Modal>
  )
}
