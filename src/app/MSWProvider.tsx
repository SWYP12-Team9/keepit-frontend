'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MSWProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isTestRoute = pathname.startsWith('/test')
  const [isReady, setIsReady] = useState(process.env.NODE_ENV !== 'development')

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      setIsReady(true)
      return
    }

    let isCancelled = false

    const syncWorker = async () => {
      const { worker } = await import('../mocks/browser')

      if (isTestRoute) {
        await worker.start({
          onUnhandledRequest(request, print) {
            if (
              request.url.includes('_next') ||
              request.url.includes('/icons/') ||
              request.url.includes('/images/')
            ) {
              return
            }
            print.warning()
          },
        })
      } else {
        worker.stop()
      }

      if (!isCancelled) {
        setIsReady(true)
      }
    }

    void syncWorker()

    return () => {
      isCancelled = true
    }
  }, [isTestRoute])

  if (!isReady) {
    return null
  }

  return <>{children}</>
}
