'use client'

import { Suspense, use } from 'react'

const mockingEnabledPromise =
  process.env.NODE_ENV === 'development' && typeof window !== 'undefined'
    ? import('../mocks/browser').then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest(request, print) {
            if (request.url.includes('_next')) {
              return
            }
            print.warning()
          },
        })
      })
    : Promise.resolve()

export default function MSWProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  )
}

function MSWProviderWrapper({ children }: { children: React.ReactNode }) {
  use(mockingEnabledPromise)
  return children
}
