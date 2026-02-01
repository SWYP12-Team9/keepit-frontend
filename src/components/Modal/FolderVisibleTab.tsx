import { cn } from '@/src/utils/cn'

interface FolderVisibleTabProps {
  isPublic: boolean
  setIsPublic: (isPublic: boolean) => void
}
export function FolderVisibleTab({
  isPublic,
  setIsPublic,
}: FolderVisibleTabProps) {
  return (
    <div className="bg-gray-field rounded-40 ml-auto flex w-max p-1">
      <button
        onClick={() => setIsPublic(true)}
        className={cn(
          'rounded-40 text-caption-1 text-gray-default px-28 py-9 transition-all',
          isPublic ? 'z-10 bg-white' : 'bg-gray-field text-gray-muted z-0',
        )}
      >
        공개
      </button>
      <button
        onClick={() => setIsPublic(false)}
        className={cn(
          'rounded-40 text-caption-1 text-gray-default px-28 py-9 transition-all',
          '-ml-14',
          !isPublic ? 'z-10 bg-white' : 'bg-gray-field text-gray-muted z-0',
        )}
      >
        비공개
      </button>
    </div>
  )
}
