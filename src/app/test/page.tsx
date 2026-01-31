'use client'

import { useEffect, useState } from 'react'
import { requestGetHome } from '../../apis/request/requestGetHome'
import { Tabs } from '@/src/components/Tabs/Tabs'
import { Tab } from '@/src/components/Tabs'

const Test = () => {
  const [tabs, setTabs] = useState<Tab[]>([])
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null)

  const handleTabChange = (tab: Tab) => {
    setSelectedTab(tab)
  }

  useEffect(() => {
    ;(async () => {
      const data = await requestGetHome()
      setTabs(data.tabs)
    })()
  }, [])

  return (
    <div>
      <Tabs tabs={tabs} selectedTab={selectedTab} onChange={handleTabChange} />
    </div>
  )
}

export default Test
