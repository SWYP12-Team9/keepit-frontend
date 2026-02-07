import { toast, ToastOptions } from 'react-toastify'
import { SuccessToast } from '../components/Toast/SuccessToast'
import { ErrorToast } from '../components/Toast/ErrorToast'

const sharedToastStyle: ToastOptions = {
  closeButton: false,
  position: 'top-center',
  autoClose: 500,
  pauseOnHover: false,
  hideProgressBar: true,
  className:
    '!z-50 !rounded-14 flex justify-between px-14 py-13 !w-[549px] h-[76px]',
}

export const showSuccessToast = (message: string) => {
  toast(SuccessToast, {
    ...sharedToastStyle,
    style: {
      background:
        'linear-gradient(to right, rgba(0, 185, 121, 0.2), #FFFFFF 30%)',
    },
    data: { message },
  })
}

export const showErrorToast = (message: string) => {
  toast(ErrorToast, {
    ...sharedToastStyle,
    style: {
      background:
        'linear-gradient(to right, rgba(233, 92, 92, 0.2), #FFFFFF 30%)',
    },
    data: { message },
  })
}
