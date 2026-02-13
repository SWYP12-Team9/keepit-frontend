import Image from 'next/image'

interface CreationPopupProps {
  isVisible: boolean
  onClose?: () => void
}

export function CreationPopup({ isVisible, onClose }: CreationPopupProps) {
  if (!isVisible) return null

  return (
    <div className="animate-fade-in-up border-blue-normal fixed right-40 bottom-40 z-[100] h-[306px] w-[320px] rounded-[14px] border bg-white p-30">
      <div className="mb-24 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="relative h-20 w-20">
            <div className="border-blue-light-active absolute inset-0 rounded-full border-[2.5px]" />

            <div className="border-t-blue-normal absolute inset-0 animate-spin rounded-full border-[2.5px] border-transparent" />
          </div>

          <span className="text-body">링크 카드를 만들고 있어요...</span>
        </div>

        <button onClick={onClose} className="rounded-full px-7">
          <Image
            src="/icons/gray-close.svg"
            alt="close"
            width={14}
            height={14}
            className="h-14 w-14"
          />
        </button>
      </div>

      <div className="flex flex-col items-center py-8">
        <div className="relative h-208 w-260">
          <Image
            src="/images/loading-save-link.png"
            alt="loadingsavelink"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}
