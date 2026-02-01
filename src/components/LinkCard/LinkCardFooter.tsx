import Image from 'next/image'
import { LinkCardProfile } from './LinkCardProfile'
import { ReadStatusTag } from './ReadStatusTag'

export function MyLinkCardFooter({
  viewCount,
  isRead,
}: {
  viewCount: number
  isRead: boolean
}) {
  return (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-[2px]">
        <Image src="../icons/card/view.svg" alt="view" width={18} height={18} />
        <span className="text-caption-2 text-gray-disabled">{viewCount}</span>
      </div>
      <ReadStatusTag isRead={isRead} />
    </div>
  )
}

export function OtherLinkCardFooter({
  nickname,
  profileImageUrl,
}: {
  nickname: string
  profileImageUrl?: string
}) {
  return (
    <div className="flex items-center">
      <LinkCardProfile nickname={nickname} profileImageUrl={profileImageUrl} />
    </div>
  )
}
