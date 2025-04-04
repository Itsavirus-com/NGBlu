import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { loginManualApi } from '@/services/api/login-manual-api'
import { omitNullAndUndefined } from '@/utils/object'

import { schema } from '../_schemas/login.schema'

export const useLogin = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tError = useTranslations('common.error')
  const toastShownRef = useRef(false)

  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const methods = useForm({ resolver: yupResolver(schema) })

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

      if (response.ok && accessToken && clientPrivateKey && responseData.success) {
        try {
          // Use NextAuth signIn to create a session
          const result = await signIn('manual-login', {
            redirect: false,
            accessToken: accessToken,
            clientPrivateKey: clientPrivateKey,
            userData: JSON.stringify(responseData.data), // Pass user data to NextAuth
            callbackUrl: '/dashboard',
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

  useEffect(() => {
    // Check for error parameters in the URL
    const error = searchParams?.get('error')

    if (error && !toastShownRef.current) {
      showToast({
        variant: 'danger',
        title: tError('authError'),
        body: tError('authErrorMessage'),
      })
      // Set the ref to true to prevent showing the toast again
      toastShownRef.current = true
    }
  }, [searchParams, showToast, tError])

  return {
    methods,
    onSubmit,
    isLoading,
  }
}
