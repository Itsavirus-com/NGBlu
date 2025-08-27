import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { passkeyApi } from '@/services/api/passkey-api'
import { totpApi } from '@/services/api/totp-api'

// Custom event for security status changes
const SECURITY_STATUS_CHANGED_EVENT = 'securityStatusChanged'

export const useSecurityEnforcement = () => {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [needsSetup, setNeedsSetup] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [userEmail, setUserEmail] = useState<string>('')

  const checkSecurityMethods = async () => {
    if (!session?.user?.email) return

    setIsChecking(true)
    try {
      // Check both TOTP and Passkey availability in parallel
      const [totpResponse, passkeyResponse] = await Promise.all([
        totpApi.check2faAvailability({ email: session.user.email }),
        passkeyApi.checkUserPasskey(session.user.email),
      ])

      let hasTotp = false
      let hasPasskey = false

      // Check TOTP availability
      if (totpResponse.ok && totpResponse.data?.success) {
        hasTotp = totpResponse.data.data.has_totp || totpResponse.data.data.hasTotp
      }

      // Check Passkey availability
      if (passkeyResponse.ok && passkeyResponse.data?.success) {
        hasPasskey = passkeyResponse.data.data.has_passkey || passkeyResponse.data.data.hasPasskey
      }

      // Only show banner if user has NEITHER TOTP nor Passkey
      setNeedsSetup(!hasTotp && !hasPasskey)
      setUserEmail(session.user.email)
    } catch (error) {
      console.error('Error checking security methods:', error)
    } finally {
      setIsChecking(false)
    }
  }

  const markSetupComplete = () => {
    setNeedsSetup(false)
  }

  // Listen for security status change events
  useEffect(() => {
    const handleSecurityStatusChange = () => {
      checkSecurityMethods()
    }

    window.addEventListener(SECURITY_STATUS_CHANGED_EVENT, handleSecurityStatusChange)

    return () => {
      window.removeEventListener(SECURITY_STATUS_CHANGED_EVENT, handleSecurityStatusChange)
    }
  }, [session?.user?.email])

  useEffect(() => {
    if (session?.user?.email) {
      checkSecurityMethods()
    }
  }, [session?.user?.email])

  // Recheck status when user navigates back from account settings
  useEffect(() => {
    if (pathname && !pathname.includes('/account-profile-settings')) {
      // User navigated away from account settings, recheck security methods
      if (session?.user?.email && needsSetup) {
        checkSecurityMethods()
      }
    }
  }, [pathname, session?.user?.email, needsSetup])

  return {
    needsSetup,
    isChecking,
    userEmail,
    markSetupComplete,
    recheckStatus: checkSecurityMethods,
  }
}

// Helper function to trigger security methods status recheck from anywhere in the app
export const triggerSecurityStatusRecheck = () => {
  window.dispatchEvent(new CustomEvent(SECURITY_STATUS_CHANGED_EVENT))
}
