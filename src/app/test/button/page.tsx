'use client'

import { Button } from '@/src/components/Button'

export default function ButtonTest() {
  return (
    <div className="flex flex-col gap-20">
      <Button width="w-85" height="h-42" variant="secondary">
        취소
      </Button>
      <Button width="w-132" height="h-42">
        저장
      </Button>
      <Button width="w-160" height="h-54" variant="secondary">
        원문 열기
      </Button>
      <Button width="w-160" height="h-54">
        내 레퍼런스 뷰에 저장
      </Button>
    </div>
  )
}
