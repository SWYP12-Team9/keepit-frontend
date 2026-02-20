import { OtherUserLinkItem } from '@/src/types/recommendations/recommendations'
import Image from 'next/image'
import { Input } from '@/src/components/Input'
import { Button } from '@/src/components/Button'
import { useSaveLinkModalStore } from '@/src/store/saveLinkModalStore'

interface SaveOtherUserLinkModalProps {
  data: OtherUserLinkItem
  onClose: () => void
}

export function SaveOtherUserLinkModal({
  data,
  onClose,
}: SaveOtherUserLinkModalProps) {
  const open = useSaveLinkModalStore((state) => state.open)

  const handleSaveLinkModalOpen = () => {
    open(data.url)
  }

  const handleOpenLink = () => {
    const url = data.url.startsWith('http') ? data.url : `https://${data.url}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="상세 보기 닫기"
        onClick={onClose}
        className="pointer-events-auto absolute inset-0 bg-transparent"
      />

      <div
        className="pointer-events-auto relative z-10 flex h-dvh w-full max-w-[405px] flex-col overflow-hidden bg-white p-20 shadow-xl md:p-30"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src="/icons/close-tab-left.svg"
          alt="close modal"
          width={30}
          height={30}
          className="cursor-pointer"
          onClick={onClose}
        />

        <div className="scrollbar-hide mt-20 flex min-h-0 flex-1 flex-col gap-20 overflow-y-auto pr-4">
          <div className="flex flex-col gap-12">
            <label className="text-body-1 text-gray-default">제목 </label>
            <Input width="w-full" defaultValue={data.title} />
          </div>
          <div className="flex flex-col gap-12">
            <label className="text-body-1 text-gray-default">링크</label>
            <Input width="w-full" defaultValue={data.url} />
          </div>
          <div className="flex flex-col gap-12">
            <label className="text-body-1 text-gray-default">Ai 핵심요약</label>
            <div className="rounded-8 bg-gray-field min-h-[130px] px-20 py-14">
              <p className="text-caption-1 text-gray-default leading-relaxed break-all whitespace-pre-wrap">
                {data.aiSummary || 'AI 요약 없음'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex shrink-0 flex-col gap-12 md:flex-row md:justify-end md:gap-14">
          <Button
            variant="secondary"
            width="w-full md:w-160"
            height="h-54"
            onClick={handleOpenLink}
          >
            원문 열기
          </Button>
          <Button
            width="w-full md:w-160"
            height="h-54"
            onClick={handleSaveLinkModalOpen}
          >
            내 레퍼런스 뷰에 저장
          </Button>
        </div>
      </div>
    </div>
  )
}
