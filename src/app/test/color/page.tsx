'use client'

import { ColorPicker } from '@/src/components/ColorPicker'
import { COLOR_OPTIONS } from '@/src/constants/colorOptions'
import { useState } from 'react'

export default function ColorTest() {
  const [color, setColor] = useState('#FFBE55')

  return (
    <ColorPicker
      colorOptions={COLOR_OPTIONS}
      color={color}
      setColor={setColor}
    />
  )
}
