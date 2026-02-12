'use client'

import { cn } from '@/src/utils/cn'
import Image from 'next/image'
import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { ColorOption } from './types'

interface ColorPickerProps {
  color: string
  colorOptions: ColorOption[]
  setColor: (color: string) => void
}

export function ColorPicker({
  color,
  colorOptions,
  setColor,
}: ColorPickerProps) {
  const [isPickerOpen, setPickerOpen] = useState(false)

  const [customColor, setCustomColor] = useState<string | null>(null)

  const handleCustomColorChange = (newColor: string) => {
    setCustomColor(newColor)
    setColor(newColor)
  }

  const isDefaultOption = colorOptions.some((option) => option.value === color)

  return (
    <div className="flex items-center gap-10">
      {colorOptions.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => setColor(option.value)}
          className={cn(
            'h-30 w-30 cursor-pointer rounded-full',
            color === option.value && 'border-blue-dark-hover border-2',
          )}
          style={{ backgroundColor: option.value }}
        />
      ))}

      {customColor && !isDefaultOption && (
        <button
          type="button"
          onClick={() => setColor(customColor)}
          className={cn(
            'border-blue-dark-hover h-30 w-30 cursor-pointer rounded-full border-2',
          )}
          style={{ backgroundColor: customColor }}
        />
      )}

      <button
        type="button"
        onClick={() => setPickerOpen(!isPickerOpen)}
        className="relative flex h-30 w-30 cursor-pointer items-center justify-center rounded-full bg-[#D9D9D9]"
      >
        <Image src="/icons/plus.svg" alt="plus" width={14} height={14} />
        {isPickerOpen && (
          <div className="absolute top-full left-0 z-50 mt-8">
            <HexColorPicker color={color} onChange={handleCustomColorChange} />
          </div>
        )}
      </button>
    </div>
  )
}
