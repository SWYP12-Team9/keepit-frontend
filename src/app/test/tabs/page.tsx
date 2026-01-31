'use client'

import { requestGetHome } from '@/src/apis/request/requestGetHome'
import { Tab, Tabs } from '@/src/components/Tabs'
import { useEffect, useState } from 'react'

export default function TabsTest() {
  const [tabs, setTabs] = useState<Tab[]>([])
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null)

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
    <Tabs tabs={tabs} selectedTab={selectedTab} onChange={handleTabChange} />
  )
}
