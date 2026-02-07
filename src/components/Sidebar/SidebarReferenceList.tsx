'use client'

import { useGetFrequentReferences } from '@/src/apis/query/reference/useGetFrequentReferences'
import { useIntersectionObserver } from '@/src/hooks/useIntersectionObserver'
import { useAuthStore } from '@/src/store/authStore'
import { cn } from '@/src/utils/cn'

interface SidebarReferenceListProps {
  isExpanded: boolean
}

export default function SidebarReferenceList({
  isExpanded,
}: SidebarReferenceListProps) {
  const { isLoggedIn } = useAuthStore()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetFrequentReferences(20)

  const { bottomRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    hasNextPage,
    isFetching: isFetchingNextPage,
    rootMargin: '40px',
  })

  if (!isExpanded) return null

  return (
    <div className="mt-12 flex max-h-236 flex-col pl-[22px]">
      <span className="text-caption-1 text-gray-disabled mb-[15px]">
        자주 찾는 레퍼런스
      </span>

      <div
        className={cn(
          'custom-scrollbar flex flex-col overflow-x-hidden overflow-y-auto',
          'gap-8 pb-8',
        )}
      >
        {isLoggedIn ? (
          <>
            {data?.pages
              .flatMap((page) => page.data.contents)
              .map((ref) => (
                <div
                  key={ref.id}
                  className="group flex cursor-pointer items-center gap-5 py-4"
                >
                  <div
                    className="h-[12px] w-[12px] flex-shrink-0 rounded-[2px]"
                    style={{ backgroundColor: ref.colorCode }}
                  />
                  <span className="text-body-4 text-gray-default">
                    {ref.title}
                  </span>
                </div>
              ))}

            <div ref={bottomRef} />

            {isFetchingNextPage && (
              <span className="text-caption-2 text-gray-disabled">
                불러오는 중…
              </span>
            )}
          </>
        ) : (
          <p className="text-body-3 text-gray-default">
            로그인하고 링크를 저장해보세요
          </p>
        )}
      </div>
    </div>
  )
}
