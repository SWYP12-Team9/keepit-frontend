import Image from 'next/image'
import { ToastContentProps } from 'react-toastify'

interface SuccessToastData {
  message: string
}

export function SuccessToast({
  closeToast,
  data,
}: ToastContentProps<SuccessToastData>) {
  return (
    <>
      <div className="flex items-center gap-14">
        <Image src="/icons/success.svg" alt="success" width={37} height={37} />
        <div className="flex flex-col gap-4">
          <span className="text-body text-[#00B979]">Success!</span>
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
