'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'
import MSWProvider from './MSWProvider'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MSWProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MSWProvider>
  )
}
