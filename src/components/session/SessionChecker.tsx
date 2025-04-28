'use client'

import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { useToast } from '@/hooks/use-toast.hook'

export const SessionChecker = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { showToast } = useToast()
  const t = useTranslations('common.error')
  const toastShownRef = useRef(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Set token expiration time on successful login
  useEffect(() => {
    if (status === 'authenticated' && session && mounted) {
      // Check if we need to set token expiration (if it doesn't exist yet)
      if (!localStorage.getItem('token_expires_at')) {
        // Set token expiration time 60 minutes from now
        const expiresAt = Date.now() + 60 * 60 * 1000
        localStorage.setItem('token_expires_at', expiresAt.toString())
        console.log('Token set to expire at:', new Date(expiresAt).toLocaleTimeString())
      }
    }
  }, [session, status, mounted])

  // Clear token expiration when component unmounts or status changes to unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      localStorage.removeItem('token_expires_at')
      // Reset toast shown ref when logged out
      toastShownRef.current = false
    }
  }, [status])

  useEffect(() => {
    if (!mounted) return

    // Create a timer to check token expiration
    const checkTokenExpiration = () => {
      // Function to handle logout with toast
      const handleTokenExpiration = (reason: string) => {
        if (!toastShownRef.current) {
          showToast({
            variant: 'danger',
            title: t('sessionExpired'),
            body: t('sessionExpiredMessage'),
          })
          toastShownRef.current = true
        }

        // Clear localStorage
        localStorage.removeItem('token_expires_at')

        // Delay logout slightly to allow toast to be seen
        setTimeout(() => {
          signOut({ redirect: true, callbackUrl: '/auth/login' })
        }, 1500)
      }

      // Check token expiration directly by looking at the token's expiresAt property
      const expiresAt = parseInt(localStorage.getItem('token_expires_at') || '0', 10)
      if (expiresAt && Date.now() > expiresAt) {
        console.log('Token expired (time check). Logging out...')
        handleTokenExpiration('time check')
        return
      }
    }

    // Check immediately
    checkTokenExpiration()

    // Set interval to check token expiration every 30 minutes
    const interval = setInterval(checkTokenExpiration, 30 * 60 * 1000)

    return () => clearInterval(interval)
  }, [session, router, mounted, showToast, t])

  return null
}
