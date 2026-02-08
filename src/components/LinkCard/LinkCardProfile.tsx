import Image from 'next/image'

interface LinkCardProfileProps {
  nickname: string
  profileImageUrl: string
}

export function LinkCardProfile({
  nickname,
  profileImageUrl,
}: LinkCardProfileProps) {
  return (
    <div className="flex items-center gap-[6px]">
      <div className="relative h-[22px] w-[22px] overflow-hidden rounded-full">
        <Image
          src={profileImageUrl?.trim() || '/images/defaultProfile.png'}
          alt={`${nickname} profile`}
          width={22}
          height={22}
          className="object-cover"
        />
      </div>
      <span className="text-caption-1 text-gray-default">{nickname}</span>
    </div>
  )
}
