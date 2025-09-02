'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { useToast } from '@/hooks/use-toast.hook'

export const SessionChecker = () => {
  const { status } = useSession()
  const [mounted, setMounted] = useState(false)
  const { showToast } = useToast()
  const t = useTranslations('common.error')
  const router = useRouter()

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
      // Check if this was an intentional logout
      const isIntentionalLogout = sessionStorage.getItem('intentional_logout')

      if (isIntentionalLogout) {
        // Clear the flag and don't show error toast for intentional logout
        sessionStorage.removeItem('intentional_logout')
        return
      }

      // Only show session expired toast for actual session expiration
      showToast({
        variant: 'danger',
        title: t('sessionExpired'),
        body: t('sessionExpiredMessage'),
      })

      // Add a small delay to prevent potential routing conflicts
      setTimeout(() => {
        router.push('/auth/login')
      }, 1000)
    }
  }, [mounted, status])

  return null
}
