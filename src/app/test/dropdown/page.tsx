'use client'

import { Dropdown, DropdownOption } from '@/src/components/Dropdown'
import { useState } from 'react'

const folderOptions: DropdownOption[] = [
  { id: 1, title: '스위프' },
  { id: 2, title: '과제' },
  { id: 3, title: '콜라' },
]

export default function DropdownTest() {
  const [selectedFolder, setSelectedFolder] = useState<DropdownOption | null>(
    null,
  )

  return (
    <Dropdown
      options={folderOptions}
      value={selectedFolder}
      onChange={setSelectedFolder}
      placeholder="레퍼런스 폴더를 선택해주세요"
    />
  )
}
