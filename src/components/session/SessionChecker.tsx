'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { PUBLIC_PAGES } from '@/constants/page'
import { useToast } from '@/hooks/use-toast.hook'

export const SessionChecker = () => {
  const { status } = useSession()
  const [mounted, setMounted] = useState(false)
  const { showToast } = useToast()
  const t = useTranslations('common.error')
  const router = useRouter()
  const pathname = usePathname()

  // Ref to track if we've already shown expiration notification
  const expiredToastShownRef = useRef(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Reset notification ref when session changes
  useEffect(() => {
    if (status === 'unauthenticated') {
      expiredToastShownRef.current = false
    }
  }, [status])

  // Handle unauthenticated users - token expiration
  useEffect(() => {
    if (!mounted || status === 'loading') return

    // unauthenticated users show toast and redirect to login
    if (status === 'unauthenticated') {
      showToast({
        variant: 'danger',
        title: t('sessionExpired'),
        body: t('sessionExpiredMessage'),
      })

      // Add a small delay to prevent potential routing conflicts
      setTimeout(() => {
        router.push('/auth/login')
      }, 500)
    }
  }, [mounted, status])

  // Check if current page is public - do this after all hooks
  const isPublicPage = PUBLIC_PAGES.some(page => pathname?.includes(page))

  // Skip session checking on public pages
  if (isPublicPage) {
    return null
  }

  return null
}
