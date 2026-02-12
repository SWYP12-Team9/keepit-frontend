import { useEffect, useRef } from 'react'
import { useDebounce } from './useDebounce'

interface UseAutoSaveProps<T> {
  value: T
  delay?: number
  onSave: (value: T) => void
  enabled?: boolean
}

export function useAutoSave<T>({
  value,
  delay = 500,
  onSave,
  enabled = true,
}: UseAutoSaveProps<T>) {
  const debouncedValue = useDebounce({ value, delay })
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!enabled) return

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    onSave(debouncedValue)
  }, [debouncedValue, enabled, onSave])
}
