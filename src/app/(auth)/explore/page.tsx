'use client'

import { useGetCategories } from '@/src/apis/query/recommendation/useGetCategories'
import { useGetOtherUserLinkList } from '@/src/apis/query/recommendation/useGetOtherUserLinkList'
import { useGetSearchOtherUserLinks } from '@/src/apis/query/recommendation/useGetSearchOtherUserLinks'
import { Tab, Tabs } from '@/src/components/Tabs'
import { ALL_TAB } from '@/src/constants/defaultTap'
import { useDebounce } from '@/src/hooks/useDebounce'
import { useState } from 'react'
import { SearchLinksInput } from '../_components/SearchLinksInput/SearchLinksInput'
import { OtherUserLinksContainer } from './_components/OtherUserLinksContainer/OtherUserLinksContainer'
import { ProfileSetup } from './_components/ProfileSetup/ProfileSetup'

export default function ExplorePage() {
  const [selectedTab, setSelectedTab] = useState<Tab>(ALL_TAB)
  const [searchKeyword, setSearchKeyword] = useState('')

  const debouncedKeyword = useDebounce({
    value: searchKeyword,
    delay: 500,
  })

  const isSearchMode = debouncedKeyword.trim().length > 0

  const { data: categories } = useGetCategories()
  const { data: otherUserLinkListData, isLoading: isOtherUserLinkListLoading } =
    useGetOtherUserLinkList({
      category: selectedTab?.id === 'all' ? undefined : selectedTab.title,
      size: 20,
    })

  const {
    data: searchOtherUserLinks,
    isLoading: isSearchOtherUserLinksLoading,
  } = useGetSearchOtherUserLinks({
    keyword: debouncedKeyword,
    size: 20,
  })

  const otherUserLinkList = isSearchMode
    ? (searchOtherUserLinks?.data ?? [])
    : (otherUserLinkListData?.data ?? [])

  const tabs = categories?.data.map((category, index) => ({
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

      <OtherUserLinksContainer
        otherUserLinkList={otherUserLinkList}
        isLoading={
          isSearchMode
            ? isSearchOtherUserLinksLoading
            : isOtherUserLinkListLoading
        }
      />

      <ProfileSetup />
    </main>
  )
}
