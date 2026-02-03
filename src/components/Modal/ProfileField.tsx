import { FieldValues, UseFormRegister } from 'react-hook-form'
import { Input } from '../Input'

interface ProfileFieldProps {
  label: string
  required?: boolean
  currentLength: number
  maxLength: number
  placeholder: string
  registerProps: ReturnType<UseFormRegister<FieldValues>>
  width?: string
}

export function ProfileField({
  label,
  required = false,
  currentLength,
  maxLength,
  placeholder,
  registerProps,
  width = 'w-full',
}: ProfileFieldProps) {
  return (
    <div className="flex flex-col gap-8">
      <label className="text-body-3 font-semibold text-gray-700">
        {label} {required && <span className="text-primary-500">*</span>}
      </label>
      <div className={`relative ${width}`}>
        <Input
          {...registerProps}
          placeholder={placeholder}
          className="rounded-8 text-body-2 h-40 w-full bg-white px-16 placeholder:text-gray-400"
        />
        <span className="text-caption-2 absolute -top-24 right-0 text-gray-400">
          {currentLength}/{maxLength}
        </span>
      </div>
    </div>
  )
}
