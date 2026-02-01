import Image from 'next/image'

interface MyLinkCardHeaderProps {
  title: string
  colorCode: string
}

export function MyLinkCardHeader({ title, colorCode }: MyLinkCardHeaderProps) {
  return (
    <div className="flex h-[38px] items-center justify-between px-12 pt-2">
      <div className="flex items-center gap-8">
        <div
          className="h-[10px] w-[10px] rounded-[2px]"
          style={{ backgroundColor: colorCode }}
        />
        <span className="text-caption-1 text-gray-disabled">{title}</span>
      </div>
      <button className="p-2">
        <Image src="/icons/card/more.svg" alt="more" width={22} height={22} />
      </button>
    </div>
  )
}

interface OtherLinkCardHeaderProps {
  category: string
}

export function OtherLinkCardHeader({ category }: OtherLinkCardHeaderProps) {
  return (
    <div className="flex h-[38px] items-center px-12 pt-2">
      <span className="text-caption-1 text-gray-disabled">{category}</span>
    </div>
  )
}
