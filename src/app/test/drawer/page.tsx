'use client'

import { Drawer } from '@/src/components/Drawer'
import { useDrawerStore } from '@/src/store/drawerStore'

export default function DrawerTest() {
  const open = useDrawerStore((state) => state.open)

  return (
    <>
      <button onClick={() => open()}>Drawer 열기</button>
      <Drawer
        onMoveLinkModalOpen={() => {
          console.log('onMoveLinkModalOpen')
        }}
        categoryColor="#5D5FEF"
        categoryName="스위프"
        viewCount={33}
        title="제목이 자동저장됨"
        defaultWhy="이유가 적힌 상태"
        link="www.figma.com"
        aiSummary="Improve your font-end coding skills by CSS and Javascript challenges whilst working to professional designs."
        defaultMemo="피그마 디자인 확인용을 위해 저장함"
      />
    </>
  )
}
