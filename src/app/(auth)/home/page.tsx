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

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<Tab | null>(ALL_TAB)

  const { data: linkListData, isLoading: isLinkListLoading } = useGetLinkList(
    selectedTab?.id === 'all' ? {} : { referenceId: selectedTab?.id },
  )

  const linkList = linkListData?.data?.contents ?? []

  const { data: referenceList } = useGetReferenceList({ type: 'all' })

  const tabs = referenceList?.data?.contents.map((item: ReferenceItem) => ({
    id: item.id,
    title: item.title,
  }))

  const handleTabChange = (tab: Tab) => {
    setSelectedTab(tab)
  }

  return (
    <div className="scrollbar-hide h-full overflow-y-auto">
      <h1 className="text-display-2 text-gray-default pb-38">
        Save Links.
        <br />
        Use them again.
      </h1>

      <SaveLinkInput />

      {/* 스크롤 시 상단에 고정 */}
      <div className="sticky top-0 z-10 mt-25 bg-white">
        <SearchLinksInput />
        <Tabs
          className="pt-35 pb-12"
          defaultTap={ALL_TAB}
          tabs={tabs || []}
          selectedTab={selectedTab}
          onChange={handleTabChange}
        />
      </div>

      <LinkListContainer linkList={linkList} isLoading={isLinkListLoading} />
    </div>
  )
}
