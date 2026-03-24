import { PendingLinkItem } from '@/src/store/pendingLinkStore'

interface PendingLinkCardProps {
  data: PendingLinkItem
}

function PendingSparkle() {
  return (
    <svg
      width="37.96"
      height="49.52"
      viewBox="0 0 38 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-[49.52px] w-[37.96px]"
    >
      <path
        d="M3.37253 28.9638L11.9145 27.482C13.601 27.1895 15.0823 26.1905 15.9856 24.7365L20.5606 17.3724L22.0423 25.9144C22.3349 27.6009 23.3338 29.0822 24.7878 29.9854L32.152 34.5604L23.61 36.0422C21.9235 36.3347 20.4422 37.3337 19.5389 38.7877L14.9639 46.1518L13.4822 37.6098C13.1896 35.9233 12.1907 34.442 10.7367 33.5388L3.37253 28.9638Z"
        fill="url(#pending-link-main)"
      />
      <path
        d="M32.7957 11.5728L32.6207 13.3431C32.4522 15.0465 33.0193 16.7407 34.1793 17.9995L35.3848 19.3076L33.6145 19.1326C31.9111 18.9641 30.2169 19.5312 28.9582 20.6912L27.65 21.8967L27.8251 20.1264C27.9935 18.423 27.4264 16.7288 26.2664 15.4701L25.0609 14.1619L26.8312 14.337C28.5346 14.5054 30.2288 13.9383 31.4876 12.7783L32.7957 11.5728Z"
        fill="url(#pending-link-secondary)"
      />
      <path
        d="M9.10256 1.27867L10.0884 2.75939C11.037 4.1842 12.549 5.13601 14.2439 5.37532L16.0053 5.62402L14.5246 6.60986C13.0998 7.55847 12.148 9.07046 11.9087 10.7654L11.66 12.5268L10.6741 11.046C9.72551 9.62124 8.21352 8.66942 6.51862 8.43011L4.75722 8.18142L6.23794 7.19558C7.66274 6.24697 8.61455 4.73497 8.85386 3.04008L9.10256 1.27867Z"
        fill="url(#pending-link-tertiary)"
      />
      <defs>
        <linearGradient
          id="pending-link-main"
          x1="3.37253"
          y1="28.9638"
          x2="32.152"
          y2="34.5604"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F1F2FA" />
          <stop offset="1" stopColor="#6064DE" />
        </linearGradient>
        <linearGradient
          id="pending-link-secondary"
          x1="32.7957"
          y1="11.5728"
          x2="27.65"
          y2="21.8967"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F1F2FA" />
          <stop offset="1" stopColor="#6064DE" />
        </linearGradient>
        <linearGradient
          id="pending-link-tertiary"
          x1="9.10256"
          y1="1.27867"
          x2="11.66"
          y2="12.5268"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F1F2FA" />
          <stop offset="1" stopColor="#6064DE" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function PendingLinkCard({ data }: PendingLinkCardProps) {
  return (
    <div className="animate-in fade-in zoom-in-[0.985] slide-in-from-bottom-3 relative mb-12 flex h-[286px] w-full max-w-[331px] min-w-0 overflow-hidden rounded-[10px] bg-[#FAFAFA] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-[331px]">
      <div className="absolute inset-0 opacity-60">
        <div className="flex h-full flex-col px-8 pt-8 pb-[10px] blur-[5px]">
          <div className="flex h-[38px] items-center px-12 pt-2">
            <div className="flex items-center gap-8">
              {data.reference?.colorCode && (
                <div
                  className="h-[10px] w-[10px] rounded-[2px]"
                  style={{ backgroundColor: data.reference.colorCode }}
                />
              )}
              <span className="text-caption-1 text-gray-disabled">
                {data.reference?.title || '미지정'}
              </span>
            </div>
          </div>

          <div className="mb-16 max-w-full px-12 sm:max-w-[273px]">
            <div className="text-body-1 min-h-[72px] text-[#2D2D2D]">
              <div className="line-clamp-3 [display:-webkit-box] overflow-hidden text-justify break-all [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                <span>{data.url}</span>
              </div>
            </div>
          </div>

          <div className="flex h-[146px] flex-col overflow-hidden rounded-2xl bg-white px-20 pt-20 pb-[14px]">
            <div className="flex min-h-[66px] gap-3">
              <div className="h-[22px] w-[22px] rounded-full bg-[#E9EAF8]" />
              <div className="flex flex-1 flex-col gap-8">
                <div className="h-12 w-full rounded-full bg-[#E9EAF8]" />
                <div className="h-12 w-[88%] rounded-full bg-[#E9EAF8]" />
                <div className="h-12 w-[72%] rounded-full bg-[#E9EAF8]" />
              </div>
            </div>

            <div className="mt-auto w-full">
              <div className="mt-14 mb-10 h-1 w-full bg-[#F2F2F2]" />
              <div className="flex items-center justify-between">
                <div className="h-18 w-86 rounded-full bg-[#E9EAF8]" />
                <div className="h-22 w-22 rounded-[6px] bg-[#E9EAF8]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[6px]">
        <div className="h-[49.52px] w-[37.96px] animate-pulse">
          <PendingSparkle />
        </div>
        <span className="text-[14px] leading-[22px] font-medium text-[#2C2C2B]">
          생성 중...
        </span>
      </div>
    </div>
  )
}
