import { cn } from '@/src/utils/cn'
import { Tab, TabVariant } from './types'

export interface TabItemProps {
  tab: Tab
  isSelected: boolean
  onChange: (tab: Tab) => void
  variant?: TabVariant
}

const variantStyles = {
  primary: {
    selected: 'bg-blue-normal',
  },
  secondary: {
    selected: 'bg-blue-dark-hover',
  },
}

export function TabItem({
  tab,
  isSelected,
  onChange,
  variant = 'primary',
}: TabItemProps) {
  const styles = variantStyles[variant]

  return (
    <button
      key={tab.id}
      role="tab"
      aria-selected={isSelected}
      onClick={() => onChange(tab)}
      className={cn(
        'text-body-3 rounded-8 px-30 py-10 whitespace-nowrap transition-colors',
        isSelected ? `${styles.selected} text-white` : 'text-gray-disabled',
      )}
    >
      {tab.title}
    </button>
  )
}
