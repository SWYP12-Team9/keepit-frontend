'use client'

import { requestGetHome } from '@/src/apis/request/requestGetHome'
import { Tab, Tabs } from '@/src/components/Tabs'
import { ALL_TAB } from '@/src/constants/defaultTap'
import { useEffect, useState } from 'react'

export default function TabsTest() {
  const [tabs, setTabs] = useState<Tab[]>([])
  const [selectedTab, setSelectedTab] = useState<Tab | null>(ALL_TAB)

  useEffect(() => {
    ;(async () => {
      const data = await requestGetHome()
      setTabs(data.tabs)
    })()
  }, [])

  const handleTabChange = (tab: Tab) => {
    setSelectedTab(tab)
  }

  return (
    <Tabs
      defaultTap={ALL_TAB}
      tabs={tabs}
      selectedTab={selectedTab}
      onChange={handleTabChange}
    />
  )
}
