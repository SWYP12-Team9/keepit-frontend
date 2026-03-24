'use client'

import { useGetCategories } from '@/src/apis/query/recommendation/useGetCategories'
import { useGetOtherUserLinkList } from '@/src/apis/query/recommendation/useGetOtherUserLinkList'
import { useGetSearchOtherUserLinks } from '@/src/apis/query/recommendation/useGetSearchOtherUserLinks'
import { LoginModal } from '@/src/components/Modal/LoginModal'
import { Tab, Tabs } from '@/src/components/Tabs'
import { ALL_TAB } from '@/src/constants/defaultTap'
import { useDebounce } from '@/src/hooks/useDebounce'
import { useAuthStore } from '@/src/store/authStore'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { SearchLinksInput } from '../_components/SearchLinksInput/SearchLinksInput'
import { OtherUserLinksContainer } from './_components/OtherUserLinksContainer/OtherUserLinksContainer'

interface ExploreLoginModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

function ExploreLoginModal({ isOpen, onOpenChange }: ExploreLoginModalProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const { isLoggedIn } = useAuthStore()

  useEffect(() => {
    if (!isLoggedIn && searchParams.get('login') === 'true') {
      onOpenChange(true)
    }
  }, [isLoggedIn, onOpenChange, searchParams])

  const handleLoginModalChange = (open: boolean) => {
    onOpenChange(open)
    if (!open) {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('login')
      router.replace(
        `${pathname}${params.toString() ? `?${params.toString()}` : ''}`,
      )
    }
  }

  return <LoginModal isOpen={isOpen} onOpenChange={handleLoginModalChange} />
}

export default function ExplorePage() {
  const [selectedTab, setSelectedTab] = useState<Tab>(ALL_TAB)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

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
    ? (searchOtherUserLinks?.data?.contents ?? [])
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
    <main className="flex h-full flex-col overflow-y-hidden px-16 md:px-84">
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
          className="py-20 md:py-30"
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

      <Suspense fallback={null}>
        <ExploreLoginModal
          isOpen={isLoginModalOpen}
          onOpenChange={setIsLoginModalOpen}
        />
      </Suspense>
    </main>
  )
}
