import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'

import { useToast } from '@/hooks/use-toast.hook'
import { PasskeyService } from '@/services/passkey.service'

export const usePasskey = () => {
  const router = useRouter()
  const { showToast } = useToast()
  const t = useTranslations('auth.passkey')
  const tError = useTranslations('common.error')

  const [isSupported, setIsSupported] = useState(false)
  const [isPlatformAuthenticatorAvailable, setIsPlatformAuthenticatorAvailable] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [userPasskeys, setUserPasskeys] = useState<any[]>([])
  const [isLoadingPasskeys, setIsLoadingPasskeys] = useState(false)
  const [hasPasskeys, setHasPasskeys] = useState<boolean | null>(null)
  const [isCheckingPasskeys, setIsCheckingPasskeys] = useState(false)

  // Check browser support on mount
  useEffect(() => {
    const checkSupport = async () => {
      const supported = PasskeyService.isSupported()
      setIsSupported(supported)

      if (supported) {
        const platformAvailable = await PasskeyService.isPlatformAuthenticatorAvailable()
        setIsPlatformAuthenticatorAvailable(platformAvailable)
      }
    }

    checkSupport()
  }, [])

  /**
   * Register a new passkey for the current user
   */
  const registerPasskey = async (name: string) => {
    if (!isSupported) {
      showToast({
        variant: 'danger',
        title: t('notSupported'),
        body: t('notSupportedMessage'),
      })
      return { success: false }
    }

    setIsRegistering(true)

    try {
      const result = await PasskeyService.registerPasskey(name)

      if (result.success) {
        showToast({
          variant: 'success',
          title: t('registrationSuccess'),
          body: t('registrationSuccessMessage'),
        })

        // Refresh the passkeys list
        // await loadUserPasskeys()

        return { success: true }
      } else {
        showToast({
          variant: 'danger',
          title: t('registrationError'),
          body: result.error || t('registrationErrorMessage'),
        })
        return { success: false, error: result.error }
      }
    } catch (error: any) {
      console.error('Passkey registration error:', error)
      showToast({
        variant: 'danger',
        title: t('registrationError'),
        body: error.message || t('registrationErrorMessage'),
      })
      return { success: false, error: error.message }
    } finally {
      setIsRegistering(false)
    }
  }

  /**
   * Authenticate using a passkey
   */
  const authenticateWithPasskey = async (email?: string) => {
    if (!isSupported) {
      showToast({
        variant: 'danger',
        title: t('notSupported'),
        body: t('notSupportedMessage'),
      })
      return { success: false }
    }

    setIsAuthenticating(true)

    try {
      const result = await PasskeyService.authenticateWithPasskey()

      if (result.success && result.authData) {
        // Extract authentication data from the backend response
        const { accessToken, accessTokenExpiresAt, clientPrivateKey, userData } = result.authData

        if (accessToken && clientPrivateKey) {
          // Use NextAuth signIn to create a session
          const signInResult = await signIn('passkey-login', {
            redirect: false,
            accessToken: accessToken,
            accessTokenExpiresAt: accessTokenExpiresAt,
            clientPrivateKey: clientPrivateKey,
            userData: JSON.stringify(userData),
            callbackUrl: '/dashboard',
          })

          if (signInResult?.ok) {
            showToast({
              variant: 'success',
              title: t('authenticationSuccess'),
              body: t('authenticationSuccessMessage'),
            })

            router.push('/dashboard')
            return { success: true }
          } else {
            throw new Error(t('sessionCreationFailed'))
          }
        } else {
          throw new Error(t('invalidAuthResponse'))
        }
      } else {
        showToast({
          variant: 'danger',
          title: t('authenticationError'),
          body: result.error || t('authenticationErrorMessage'),
        })
        return { success: false, error: result.error }
      }
    } catch (error: any) {
      console.error('Passkey authentication error:', error)
      showToast({
        variant: 'danger',
        title: t('authenticationError'),
        body: error.message || t('authenticationErrorMessage'),
      })
      return { success: false, error: error.message }
    } finally {
      setIsAuthenticating(false)
    }
  }

  /**
   * Authenticate using conditional UI (browser autofill)
   */
  const authenticateWithConditionalUI = useCallback(async () => {
    if (!isSupported) {
      return { success: false }
    }

    try {
      const result = await PasskeyService.authenticateWithConditionalUI()

      if (result.success && result.authData) {
        // Extract authentication data from the backend response
        const { accessToken, accessTokenExpiresAt, clientPrivateKey, userData } = result.authData

        if (accessToken && clientPrivateKey) {
          // Use NextAuth signIn to create a session
          const signInResult = await signIn('passkey-login', {
            redirect: false,
            accessToken: accessToken,
            accessTokenExpiresAt: accessTokenExpiresAt,
            clientPrivateKey: clientPrivateKey,
            userData: JSON.stringify(userData),
            callbackUrl: '/dashboard',
          })

          if (signInResult?.ok) {
            showToast({
              variant: 'success',
              title: t('authenticationSuccess'),
              body: t('authenticationSuccessMessage'),
            })

            router.push('/dashboard')
            return { success: true }
          }
        }
      }

      return { success: false, error: result.error }
    } catch (error: any) {
      console.error('Conditional UI authentication error:', error)
      return { success: false, error: error.message }
    }
  }, [isSupported, router])

  /**
   * Check if user has registered passkeys
   */
  const checkPasskeyAvailability = useCallback(async () => {
    if (!isSupported) {
      setHasPasskeys(false)
      return { hasPasskeys: false }
    }

    setIsCheckingPasskeys(true)
    try {
      const result = await PasskeyService.hasRegisteredPasskeys()
      setHasPasskeys(result.hasPasskeys)
      return result
    } catch (error) {
      console.error('Error checking passkey availability:', error)
      setHasPasskeys(false)
      return { hasPasskeys: false, error: t('checkAvailabilityFailed') }
    } finally {
      setIsCheckingPasskeys(false)
    }
  }, [isSupported])

  /**
   * Load user's registered passkeys
   */
  const loadUserPasskeys = async () => {
    setIsLoadingPasskeys(true)
    try {
      const response = await PasskeyService.getUserPasskeys()
      if (response.ok && response.data) {
        setUserPasskeys(response.data.data)
      }
    } catch (error) {
      console.error('Error loading passkeys:', error)
      showToast({
        variant: 'danger',
        title: tError('error'),
        body: t('loadPasskeysError'),
      })
    } finally {
      setIsLoadingPasskeys(false)
    }
  }

  /**
   * Delete a passkey
   */
  const deletePasskey = async (passkeyId: string) => {
    try {
      const response = await PasskeyService.deletePasskey(passkeyId)
      if (response.ok) {
        showToast({
          variant: 'success',
          title: t('deleteSuccess'),
          body: t('deleteSuccessMessage'),
        })
        // Refresh the passkeys list
        await loadUserPasskeys()
        return { success: true }
      } else {
        throw new Error(t('deletePasskeyFailed'))
      }
    } catch (error: any) {
      console.error('Error deleting passkey:', error)
      showToast({
        variant: 'danger',
        title: t('deleteError'),
        body: error.message || t('deleteErrorMessage'),
      })
      return { success: false, error: error.message }
    }
  }

  return {
    // State
    isSupported,
    isPlatformAuthenticatorAvailable,
    isRegistering,
    isAuthenticating,
    userPasskeys,
    isLoadingPasskeys,
    hasPasskeys,
    isCheckingPasskeys,

    // Actions
    registerPasskey,
    authenticateWithPasskey,
    authenticateWithConditionalUI,
    checkPasskeyAvailability,
    loadUserPasskeys,
    deletePasskey,
  }
}
