import { Input } from '@/src/components/Input'
import Image from 'next/image'

interface SearchLinksInputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchLinksInput({ value, onChange }: SearchLinksInputProps) {
  return (
    <div className="relative">
      <Input
        className="rounded-100 text-body-1 px-40"
        height="h-60"
        placeholder="왜 저장했는지로 검색해 보세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Image
        src="/icons/search.svg"
        alt="search"
        width={30}
        height={30}
        className="pointer-events-none absolute top-1/2 right-30 -translate-y-1/2"
      />
    </div>
  )
}
