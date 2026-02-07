import Image from 'next/image'
import { ToastContentProps } from 'react-toastify'

interface ErrorToastData {
  message: string
}

export function ErrorToast({
  closeToast,
  data,
}: ToastContentProps<ErrorToastData>) {
  return (
    <>
      <div className="flex items-center gap-14">
        <Image src="/icons/error.svg" alt="error" width={37} height={37} />
        <div className="flex flex-col gap-4">
          <span className="text-body text-[#E95C5C]">Error!</span>
          <p className="text-body-4 text-gray-disabled">{data.message}</p>
        </div>
      </div>
      <Image
        src="/icons/close.svg"
        alt="close"
        width={22}
        height={22}
        className="mb-auto"
        onClick={() => closeToast()}
      />
    </>
  )
}
