'use client'

import { useGetCategories } from '@/src/apis/query/recommendation/useGetCategories'
import { ProfileSetup } from './_components/ProfileSetup'
import { Tab, Tabs } from '@/src/components/Tabs'
import { ALL_TAB } from '@/src/constants/defaultTap'
import { useState } from 'react'
import { SearchLinksInput } from '../home/_components/SearchLinksInput/SearchLinksInput'
import { OtherLinkCard } from '@/src/components/LinkCard'
import { useGetOtherUserLinkList } from '@/src/apis/query/recommendation/useGetOtherUserLinkList'
import { OtherUserLinkItem } from '@/src/types/recommendations/recommendations'
import { SaveOtherUserLinkModal } from './_components/SaveOtherUserLinkModal/SaveOtherUserLinkModal'

export default function ExplorePage() {
  const [selectedTab, setSelectedTab] = useState<Tab>(ALL_TAB)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedLink, setSelectedLink] = useState<OtherUserLinkItem | null>(
    null,
  )

  const { data: categories } = useGetCategories()
  const { data: otherUserLinkList } = useGetOtherUserLinkList({
    category: selectedTab?.id === 'all' ? undefined : selectedTab.title,
    size: 20,
  })

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
    <main className="scrollbar-hide h-full overflow-y-auto px-84 pb-24">
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

      <div className="relative">
        <div className="flex flex-wrap gap-10">
          {otherUserLinkList?.data.map((item: OtherUserLinkItem) => (
            <div key={item.id} onClick={() => setSelectedLink(item)}>
              <OtherLinkCard data={item} />
            </div>
          ))}
        </div>
        {selectedLink && (
          <SaveOtherUserLinkModal
            data={selectedLink}
            onClose={() => setSelectedLink(null)}
          />
        )}
      </div>

      <ProfileSetup />
    </main>
  )
}
