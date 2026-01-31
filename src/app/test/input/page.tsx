'use client'

import { Input } from '@/src/components/Input'
import { useForm } from 'react-hook-form'

interface InputTestForm {
  name: string
}

export default function InputTest() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = (data: InputTestForm) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="레퍼런스 폴더 이름"
        {...register('name', {
          required: '레퍼런스 폴더 이름은 필수 입력 항목입니다.',
          minLength: {
            value: 3,
            message: '레퍼런스 폴더 이름은 최소 3자 이상이어야 합니다.',
          },
        })}
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      <button type="submit">Submit</button>
    </form>
  )
}
