import { TextArea } from '@/src/components/TextArea'

export default function TextAreaTest() {
  return (
    <>
      <TextArea
        placeholder="메모를 입력하세요(선택)"
        width="w-340"
        height="h-130"
      />
      <TextArea
        className="bg-gray-field text-body-3"
        width="w-340"
        height="h-130"
      />
    </>
  )
}
