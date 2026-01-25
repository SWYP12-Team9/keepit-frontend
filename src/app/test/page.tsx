'use client'

import { useEffect } from 'react'
import { requestGetHome } from '../../apis/request/requestGetHome'

const Test = () => {
  useEffect(() => {
    ;(async () => {
      const data = await requestGetHome()
    })()
  }, [])

  return <div>Test Page</div>
}

export default Test
