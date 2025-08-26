'use client'

import { ReactNode } from 'react'
import { SWRConfig } from 'swr'

import { fetcher } from '@/services/swr/fetcher'
import { loadingMiddleware } from '@/services/swr/middleware/loading-middleware'

interface SWRProviderWrapperProps {
  children: ReactNode
}

export function SWRProviderWrapper({ children }: SWRProviderWrapperProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        use: [loadingMiddleware('api')],
        // Disable retries on errors to prevent infinite loading
        errorRetryCount: 0,
        errorRetryInterval: 0,
        // Disable automatic revalidation on focus
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  )
}
