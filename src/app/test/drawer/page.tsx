'use client'

import { Drawer } from '@/src/components/Drawer'
import { useState } from 'react'

export default function DrawerTest() {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen)
    return <button onClick={() => setIsOpen(true)}>Drawer 열기</button>

  return (
    <Drawer
      onClose={() => setIsOpen(false)}
      categoryColor="#5D5FEF"
      categoryName="스위프"
      viewCount={33}
      title="제목이 자동저장됨"
      reason="이유가 적힌 상태"
      link="www.figma.com"
      aiSummary="Improve your font-end coding skills by CSS and Javascript challenges whilst working to professional designs."
      memo="피그마 디자인 확인용을 위해 저장함"
    />
  )
}
