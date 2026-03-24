import Image from 'next/image'

interface CreationPopupProps {
  isVisible: boolean
  onClose?: () => void
}

function LoadingSpinner() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-20 w-20 animate-spin [animation-duration:1.2s]"
    >
      <rect x="9" width="2" height="6" rx="1" fill="#F8F8FF" />
      <rect
        x="2"
        y="3.41602"
        width="2.0024"
        height="6"
        rx="1.0012"
        transform="rotate(-45 2 3.41602)"
        fill="#3A3C85"
      />
      <rect
        width="2.0024"
        height="6"
        rx="1.0012"
        transform="matrix(0.707107 0.707107 0.707107 -0.707107 12 6.53101)"
        fill="#EFF0FC"
      />
      <rect
        width="2"
        height="6"
        rx="1"
        transform="matrix(0 1 1 0 14 9)"
        fill="#E7E8FA"
      />
      <rect
        width="2.0024"
        height="6"
        rx="1.0012"
        transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 7.94727 13.416)"
        fill="#565AC8"
      />
      <rect
        width="2"
        height="6"
        rx="1"
        transform="matrix(1 0 0 -1 9 20)"
        fill="#6064DE"
      />
      <rect
        width="2"
        height="6"
        rx="1"
        transform="matrix(0 -1 -1 0 6 11)"
        fill="#484BA7"
      />
      <rect
        x="17.9473"
        y="16.531"
        width="2.0024"
        height="6"
        rx="1.0012"
        transform="rotate(135 17.9473 16.531)"
        fill="#CECFF5"
      />
    </svg>
  )
}

function FolderIllustration() {
  return (
    <svg
      width="186"
      height="176"
      viewBox="0 0 186 176"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-full w-full"
    >
      <g filter="url(#creation-popup-folder-blur)">
        <path
          d="M136.731 52.8894C143.945 52.8894 146.01 61.8752 146.141 66.368V163.875C146.141 169.397 141.664 173.875 136.141 173.875H19.9469C14.638 173.875 10.2866 169.744 10.1328 164.437C9.31892 136.367 8.41093 66.8878 9.50297 61.1416C10.7576 54.5399 15.6455 52.8894 17.9326 52.8894H136.731Z"
          fill="url(#creation-popup-folder-glow)"
        />
      </g>
      <g clipPath="url(#creation-popup-clip-0)">
        <path
          d="M69.2109 76.0913L81.6794 38.6418C82.9006 34.9738 86.8588 33.0062 90.5202 34.2472L118.116 43.6C121.777 44.8409 123.755 48.8205 122.534 52.4885L114.516 76.5723L88.5022 90.0205L73.6292 84.9797C69.9678 83.7388 67.9896 79.7593 69.2109 76.0913Z"
          fill="#F3F3F3"
        />
        <path
          d="M88.4986 90.018L114.515 76.5715L98.8231 71.0959C96.7053 70.3569 94.4033 71.5065 93.7217 73.6435L88.4986 90.018Z"
          fill="#BEBEBE"
        />
      </g>
      <g clipPath="url(#creation-popup-clip-1)">
        <path
          d="M144.309 61.3359L126.271 26.3249C124.5 22.8883 125.836 18.64 129.256 16.8361L154.978 3.26621C158.398 1.46234 162.605 2.78599 164.376 6.22266L175.978 28.7411L167.571 56.9784L153.706 64.2924C150.287 66.0962 146.08 64.7726 144.309 61.3359Z"
          fill="#F3F3F3"
        />
        <path
          d="M167.33 57.1053L175.893 28.5758L161.14 36.3585C159.187 37.3892 158.423 39.8168 159.435 41.7806L167.33 57.1053Z"
          fill="#BEBEBE"
        />
      </g>
      <path
        d="M139.163 173.878H17.7947C9.82073 173.878 7.56668 166.712 7.43639 163.129C5.09111 135.572 0.322374 78.2692 0.00967081 69.5134C-0.303033 60.7577 7.0455 58.5688 10.7589 58.5688C24.3745 58.634 52.7393 58.7252 57.2735 58.5688C61.8077 58.4125 64.4951 60.1227 65.8728 61.5004C66.5894 62.217 69.078 64.8229 73.2995 69.5134C77.521 74.204 78.9576 75.0122 81.3126 74.9858C98.7067 74.7903 135.84 74.5167 145.221 74.9858C154.602 75.4548 156.557 83.3897 156.361 87.2985C154.537 109.123 150.655 154.882 149.716 163.324C148.778 171.767 142.29 173.878 139.163 173.878Z"
        fill="url(#creation-popup-folder-main)"
      />
      <defs>
        <filter
          id="creation-popup-folder-blur"
          x="7"
          y="50.8894"
          width="141.141"
          height="124.985"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="1"
            result="effect1_foregroundBlur_3059_7239"
          />
        </filter>
        <linearGradient
          id="creation-popup-folder-glow"
          x1="133.713"
          y1="44.0091"
          x2="82.5005"
          y2="146.746"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6064DE" />
          <stop offset="1" stopColor="#6064DE" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient
          id="creation-popup-folder-main"
          x1="142.204"
          y1="42.2304"
          x2="27.0369"
          y2="185.501"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6064DE" />
          <stop offset="1" stopColor="#6064DE" stopOpacity="0.4" />
        </linearGradient>
        <clipPath id="creation-popup-clip-0">
          <rect
            width="43.1375"
            height="53.4706"
            fill="white"
            transform="matrix(0.947083 0.320989 -0.315893 0.948795 83.8906 32.0002)"
          />
        </clipPath>
        <clipPath id="creation-popup-clip-1">
          <rect
            width="43.0827"
            height="53.3847"
            fill="white"
            transform="matrix(0.88447 -0.466598 0.458008 0.888948 123.064 20.1023)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export function CreationPopup({ isVisible, onClose }: CreationPopupProps) {
  if (!isVisible) return null

  return (
    <div className="animate-in fade-in zoom-in-[0.985] slide-in-from-bottom-4 border-blue-normal fixed right-40 bottom-40 z-[100] h-[306px] w-[320px] rounded-[14px] border bg-white px-[30px] pt-[30px] pb-[28px] shadow-[0_0_10px_#E7E8FA] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
      <div className="relative h-full w-full">
        <div className="flex h-24 w-[260px] items-center justify-between">
          <div className="flex h-24 w-[218px] items-center gap-[3px]">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center">
              <LoadingSpinner />
            </div>
            <div className="flex h-24 w-[195px] items-center">
              <span className="text-[18px] leading-[24px] font-semibold tracking-[-0.015em] text-[#2C2C2B]">
                링크 카드를 만들고 있어요...
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-14 w-14 shrink-0 items-center justify-center"
          >
            <Image
              src="/icons/gray-close.svg"
              alt="close"
              width={14}
              height={14}
              className="h-14 w-14"
            />
          </button>
        </div>

        <div className="relative mt-[14px] h-[208px] w-[260px]">
          <div className="absolute top-[45px] left-[65px] h-[130px] w-[130px] rounded-full bg-[#CECFF5] blur-[25px]" />
          <div className="absolute top-[14px] left-[52px] h-[173.88px] w-[185.62px]">
            <FolderIllustration />
          </div>
        </div>
      </div>
    </div>
  )
}
