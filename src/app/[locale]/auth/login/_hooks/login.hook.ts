import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { usePasskey } from '@/hooks/use-passkey.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { loginManualApi } from '@/services/api/login-manual-api'
import { omitNullAndUndefined } from '@/utils/object'

import { schema } from '../_schemas/login.schema'

export const useLogin = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tError = useTranslations('common.error')
  const toastShownRef = useRef(false)
  const {
    isSupported: isPasskeySupported,
    authenticateWithPasskey,
    authenticateWithConditionalUI,
    isAuthenticating: isPasskeyAuthenticating,
  } = usePasskey()

  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const methods = useForm({ resolver: yupResolver(schema) })

  // Handler for Microsoft sign-in
  const handleMicrosoftSignIn = async () => {
    await signIn('azure-ad')
  }

  const onSubmit = async (data: any) => {
    const submitData = omitNullAndUndefined(data)
    setIsLoading(true)

    try {
      const response = await loginManualApi.new(submitData)

      // Get the response data
      const responseData = response.data || {}

      // Access headers directly as properties instead of using get()
      const headers = response.headers as Record<string, string>
      const accessToken = headers['access-token']
      const clientPrivateKey = headers['client-private-key']
      const accessTokenExpiresAt = headers['access-token-expires-at']

      if (response.ok && accessToken && clientPrivateKey && responseData.success) {
        try {
          // Use NextAuth signIn to create a session
          const result = await signIn('manual-login', {
            redirect: false,
            accessToken: accessToken,
            clientPrivateKey: clientPrivateKey,
            userData: JSON.stringify(responseData.data), // Pass user data to NextAuth
            callbackUrl: '/dashboard',
            accessTokenExpiresAt: accessTokenExpiresAt,
          })

          if (result?.ok) {
            router.push('/dashboard')
          } else {
            console.error('SignIn failed:', result?.error)
            showToast({
              variant: 'danger',
              title: tError('authError'),
              body: tError('authErrorMessage'),
            })
          }
        } catch (secretError) {
          console.error('Error generating shared secret:', secretError)
          showToast({
            variant: 'danger',
            title: tError('authError'),
            body: 'Error generating security credentials',
          })
        }
      } else {
        console.error('Login failed or missing required data:', {
          ok: response.ok,
          accessToken,
          clientPrivateKey,
          success: responseData?.success,
          message: responseData?.message,
        })
        showToast({
          variant: 'danger',
          title: tError('authError'),
          body: responseData?.message || tError('authErrorMessage'),
        })
      }
    } catch (error: any) {
      showToast({
        variant: 'danger',
        title: tError('authError'),
        body: error.message ?? tError('authErrorMessage'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasskeySignIn = async () => {
    await authenticateWithPasskey()
  }

  // Initialize conditional UI for passkey autofill
  useEffect(() => {
    if (isPasskeySupported) {
      // Delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        authenticateWithConditionalUI()
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isPasskeySupported])

  useEffect(() => {
    // Check for error parameters in the URL
    const error = searchParams?.get('error')
    const errorDescription = searchParams?.get('error_description')

    // Check for our custom backend error parameter - this is the most reliable source
    const backendError = searchParams?.get('backend_error')

    // Check if there's a callbackUrl that contains errors
    const callbackUrl = searchParams?.get('callbackUrl')
    let callbackError = null
    let callbackBackendError = null

    // Extract error info from nested callbackUrl
    if (callbackUrl) {
      try {
        const callbackUrlObj = new URL(callbackUrl)
        callbackError = callbackUrlObj.searchParams.get('error')
        callbackBackendError = callbackUrlObj.searchParams.get('backend_error')
      } catch (e) {
        console.error('Failed to parse callbackUrl:', callbackUrl, e)
      }
    }

    // Combine error sources - prioritize direct errors, then check callback errors
    const finalError = error || callbackError
    const finalBackendError = backendError || callbackBackendError

    if ((finalError || finalBackendError) && !toastShownRef.current) {
      let errorMessage = tError('authErrorMessage') // fallback

      // Priority 1: Use our custom backend_error parameter if available
      if (finalBackendError) {
        try {
          // We need to decode it twice because it's double-encoded during redirect
          let decodedError = decodeURIComponent(finalBackendError)
          // Check if still contains URL-encoded characters (%)
          if (decodedError.includes('%')) {
            decodedError = decodeURIComponent(decodedError)
          }
          errorMessage = decodedError
        } catch (e) {
          errorMessage = finalBackendError
        }
      }

      showToast({
        variant: 'danger',
        title: tError('authError'),
        body: errorMessage,
      })
      // Set the ref to true to prevent showing the toast again
      toastShownRef.current = true
    }
  }, [searchParams, showToast, tError])

  return {
    // state
    methods,
    isLoading,
    isPasskeySupported,
    isPasskeyAuthenticating,
    // actions
    onSubmit,
    handleMicrosoftSignIn,
    handlePasskeySignIn,
  }
}
