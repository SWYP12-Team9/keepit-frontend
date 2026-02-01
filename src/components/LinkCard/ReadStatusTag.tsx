type ReadStatusTagProps = {
  isRead: boolean
}

export function ReadStatusTag({ isRead = false }: ReadStatusTagProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-sm px-[10px] py-[2px] ${
        isRead ? 'bg-blue-light-hover' : 'bg-gray-field'
      }`}
    >
      <span
        className={`text-caption-2 ${
          isRead ? 'text-gray-default' : 'text-gray-disabledd'
        }`}
      >
        {isRead ? '열람' : '미열람'}
      </span>
    </div>
  )
}
