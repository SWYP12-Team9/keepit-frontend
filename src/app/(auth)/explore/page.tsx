'use client'

import { useGetCategories } from '@/src/apis/query/recommendation/useGetCategories'
import { useGetOtherUserLinkList } from '@/src/apis/query/recommendation/useGetOtherUserLinkList'
import { useGetSearchOtherUserLinks } from '@/src/apis/query/recommendation/useGetSearchOtherUserLinks'
import { Tab, Tabs } from '@/src/components/Tabs'
import { ALL_TAB } from '@/src/constants/defaultTap'
import { useDebounce } from '@/src/hooks/useDebounce'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { SearchLinksInput } from '../_components/SearchLinksInput/SearchLinksInput'
import { OtherUserLinksContainer } from './_components/OtherUserLinksContainer/OtherUserLinksContainer'
import { LoginModal } from '@/src/components/LoginModal'
import { useAuthStore } from '@/src/store/authStore'

export default function ExplorePage() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const { isLoggedIn } = useAuthStore()

  const [selectedTab, setSelectedTab] = useState<Tab>(ALL_TAB)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(
    !isLoggedIn && searchParams.get('login') === 'true',
  )

  const handleLoginModalChange = (open: boolean) => {
    setIsLoginModalOpen(open)
    if (!open) {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('login')
      router.replace(
        `${pathname}${params.toString() ? `?${params.toString()}` : ''}`,
      )
    }
  }

  const debouncedKeyword = useDebounce({
    value: searchKeyword,
    delay: 500,
  })

  const isSearchMode = debouncedKeyword.trim().length > 0

  const { data: categories } = useGetCategories()

  const isAllTab = selectedTab?.id === 'all' || selectedTab?.title === '전체'

  const {
    data: otherUserLinkListData,
    isLoading: isOtherUserLinkListLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetOtherUserLinkList({
    category: isAllTab ? null : selectedTab.title,
    size: 20,
  })

  const {
    data: searchOtherUserLinks,
    isLoading: isSearchOtherUserLinksLoading,
  } = useGetSearchOtherUserLinks({
    keyword: debouncedKeyword,
    size: 10,
  })

  const otherUserLinkList = isSearchMode
    ? (searchOtherUserLinks?.data ?? [])
    : (otherUserLinkListData?.pages.flatMap((page) => page.data.contents) ?? [])

  const tabs = categories?.data
    .filter((category: string) => category !== '전체')
    .map((category: string, index: number) => ({
      id: index,
      title: category,
    }))

  const handleSearchChange = (value: string) => {
    setSearchKeyword(value)
  }

  const handleTabChange = (tab: Tab) => {
    setSelectedTab(tab)
  }

  return (
    <main className="flex h-full flex-col overflow-y-hidden px-84">
      <div className="shrink-0">
        <SearchLinksInput
          value={searchKeyword}
          onChange={handleSearchChange}
          placeholder="키워드를 입력해 탐색해 보세요"
        />
        <Tabs
          defaultTap={ALL_TAB}
          tabs={tabs}
          selectedTab={selectedTab}
          onChange={handleTabChange}
          className="py-30"
        />
      </div>

      <div className="h-full min-h-0 flex-1">
        <OtherUserLinksContainer
          otherUserLinkList={otherUserLinkList}
          isLoading={
            isSearchMode
              ? isSearchOtherUserLinksLoading
              : isOtherUserLinkListLoading
          }
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={isSearchMode ? undefined : fetchNextPage}
          hasMore={isSearchMode ? false : hasNextPage}
        />
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onOpenChange={handleLoginModalChange}
      />
    </main>
  )
}
