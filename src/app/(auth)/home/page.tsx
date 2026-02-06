'use client'

import { useGetLinkList } from '@/src/apis/query/link/useGetLinkList'
import { useGetReferenceList } from '@/src/apis/query/reference/useGetReferenceList'
import { Tab, Tabs } from '@/src/components/Tabs'
import { ALL_TAB } from '@/src/constants/defaultTap'
import { ReferenceItem } from '@/src/types/reference/reference'
import { useState } from 'react'
import { LinkListContainer } from './_components/LinkListContainer/LinkListContainer'
import { SearchLinksInput } from './_components/SearchLinksInput/SearchLinksInput'
import { SaveLinkInput } from './_components/SaveLinkInput/SaveLinkInput'
import { useDrawerStore } from '@/src/store/drawerStore'
import { useDebounce } from '@/src/hooks/useDebounce'
import { useGetSearchLinks } from '@/src/apis/query/link/useGetSearchLinks'

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedTab, setSelectedTab] = useState<Tab | null>(ALL_TAB)
  const closeDrawer = useDrawerStore((state) => state.close)

  const debouncedKeyword = useDebounce({
    value: searchKeyword,
    delay: 500,
  })

  const isSearchMode = debouncedKeyword.trim().length > 0

  const { data: linkListData, isLoading: isLinkListLoading } = useGetLinkList(
    selectedTab?.id === 'all' ? {} : { referenceId: selectedTab?.id },
  )

  const { data: searchLinksData, isLoading: isSearchLinksLoading } =
    useGetSearchLinks({
      keyword: debouncedKeyword,
      referenceId: selectedTab?.id === 'all' ? undefined : selectedTab?.id,
      size: 20,
    })

  const linkList = isSearchMode
    ? (searchLinksData?.data?.contents ?? [])
    : (linkListData?.data?.contents ?? [])

  const { data: referenceList } = useGetReferenceList({ type: 'all' })

  const tabs = referenceList?.data?.contents.map((item: ReferenceItem) => ({
    id: item.id,
    title: item.title,
  }))

  const handleTabChange = (tab: Tab) => {
    setSelectedTab(tab)
    closeDrawer()
  }

  const handleSearchChange = (value: string) => {
    setSearchKeyword(value)
  }

  return (
    <div className="scrollbar-hide h-full overflow-y-auto px-84">
      <h1 className="text-display-2 text-gray-default pb-38">
        Save Links.
        <br />
        Use them again.
      </h1>

      <SaveLinkInput />

      <div className="sticky top-0 z-10 mt-25 bg-white">
        <SearchLinksInput
          value={searchKeyword}
          placeholder="왜 저장했는지로 검색해 보세요"
          onChange={handleSearchChange}
        />
        <Tabs
          className="pt-35 pb-12"
          defaultTap={ALL_TAB}
          tabs={tabs || []}
          selectedTab={selectedTab}
          onChange={handleTabChange}
        />
      </div>

      <LinkListContainer
        linkList={linkList}
        isLoading={isSearchMode ? isSearchLinksLoading : isLinkListLoading}
        isSearchMode={isSearchMode}
      />
    </div>
  )
}
