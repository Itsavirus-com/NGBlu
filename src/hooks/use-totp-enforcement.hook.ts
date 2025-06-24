import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { totpApi } from '@/services/api/totp-api'

// Custom event for 2FA status changes
const TOTP_STATUS_CHANGED_EVENT = 'totpStatusChanged'

export const useTotpEnforcement = () => {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [needsSetup, setNeedsSetup] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [userEmail, setUserEmail] = useState<string>('')

  const checkTotpStatus = async () => {
    if (!session?.user?.email) return

    setIsChecking(true)
    try {
      const response = await totpApi.check2faAvailability({ email: session.user.email })

      if (response.ok && response.data?.success) {
        const hasTotp = response.data.data.has_totp || response.data.data.hasTotp
        setNeedsSetup(!hasTotp)
        setUserEmail(session.user.email)
      }
    } catch (error) {
      console.error('Error checking 2FA status:', error)
    } finally {
      setIsChecking(false)
    }
  }

  const markSetupComplete = () => {
    setNeedsSetup(false)
  }

  // Listen for 2FA status change events
  useEffect(() => {
    const handleTotpStatusChange = () => {
      checkTotpStatus()
    }

    window.addEventListener(TOTP_STATUS_CHANGED_EVENT, handleTotpStatusChange)

    return () => {
      window.removeEventListener(TOTP_STATUS_CHANGED_EVENT, handleTotpStatusChange)
    }
  }, [session?.user?.email])

  useEffect(() => {
    if (session?.user?.email) {
      checkTotpStatus()
    }
  }, [session?.user?.email])

  // Recheck status when user navigates back from account settings
  useEffect(() => {
    if (pathname && !pathname.includes('/account-profile-settings')) {
      // User navigated away from account settings, recheck 2FA status
      if (session?.user?.email && needsSetup) {
        checkTotpStatus()
      }
    }
  }, [pathname, session?.user?.email, needsSetup])

  return {
    needsSetup,
    isChecking,
    userEmail,
    markSetupComplete,
    recheckStatus: checkTotpStatus,
  }
}

// Helper function to trigger 2FA status recheck from anywhere in the app
export const triggerTotpStatusRecheck = () => {
  window.dispatchEvent(new CustomEvent(TOTP_STATUS_CHANGED_EVENT))
}
