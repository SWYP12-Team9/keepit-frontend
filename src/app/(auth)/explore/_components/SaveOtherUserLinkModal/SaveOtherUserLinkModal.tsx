import { OtherUserLinkItem } from '@/src/types/recommendations/recommendations'
import Image from 'next/image'
import { Input } from '@/src/components/Input'
import { TextArea } from '@/src/components/TextArea'
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

  return (
    <div className="rounded-20 sticky top-0 bottom-0 z-40 flex h-592 w-682 flex-col gap-20 overflow-y-auto bg-white p-30 shadow-[0_0_20px_0_rgba(234,234,234,1)]">
      <Image
        src="/icons/close-tab-left.svg"
        alt="close modal"
        width={30}
        height={30}
        className="cursor-pointer"
        onClick={onClose}
      />

      <div className="flex flex-col gap-12">
        <label className="text-body-1 text-gray-default">제목 </label>
        <Input width="w-1/2" defaultValue={data.title} />
      </div>
      <div className="flex flex-col gap-12">
        <label className="text-body-1 text-gray-default">링크</label>
        <Input width="w-1/2" defaultValue={data.url} />
      </div>
      <div className="flex flex-col gap-12">
        <label className="text-body-1 text-gray-default">Ai 핵심요약</label>
        <TextArea
          height="h-130"
          defaultValue={data.aiSummary}
          className="bg-gray-field"
        />
      </div>

      <div className="mt-auto flex justify-end gap-14">
        <Button variant="secondary" width="w-160" height="h-54">
          원문 열기
        </Button>
        <Button width="w-160" height="h-54" onClick={handleSaveLinkModalOpen}>
          내 레퍼런스 뷰에 저장
        </Button>
      </div>
    </div>
  )
}
