import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { totpApi } from '@/services/api/totp-api'

import {
  type TotpVerificationFormData,
  totpVerificationSchema,
} from '../_schemas/totp-verification.schema'

interface UseTotpVerificationProps {
  tempToken: string
  email: string
  onBackToPassword: () => void
}

export function useTotpVerification({
  tempToken,
  email,
  onBackToPassword,
}: UseTotpVerificationProps) {
  const router = useRouter()
  const tError = useTranslations('common.error')
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [useBackupCode, setUseBackupCode] = useState(false)

  const methods = useForm<TotpVerificationFormData>({
    resolver: yupResolver(totpVerificationSchema),
    defaultValues: {
      code: '',
      useBackupCode: false,
    },
  })

  const onSubmit = async (data: TotpVerificationFormData) => {
    setIsLoading(true)

    try {
      const response = await totpApi.verify2fa({
        temp_token: tempToken,
        code: data.code,
        type: useBackupCode ? 'backup' : '2fa',
      })

      if (response.ok && response.data?.success) {
        // Extract tokens from response headers
        const headers = response.headers as Record<string, string>
        const accessToken = headers['access-token']
        const clientPrivateKey = headers['client-private-key']
        const accessTokenExpiresAt = headers['access-token-expires-at']

        if (accessToken && clientPrivateKey) {
          // Create session with the tokens from 2FA verification
          const signInData = {
            accessToken: accessToken,
            clientPrivateKey: clientPrivateKey,
            userData: JSON.stringify(response.data.data),
            ...(accessTokenExpiresAt && { accessTokenExpiresAt: accessTokenExpiresAt }),
          }

          const result = await signIn('manual-login', signInData, { callbackUrl: '/dashboard' })

          // Handle only error cases - success cases (ok, url, undefined) are handled by NextAuth
          if (result?.error) {
            showToast({
              variant: 'danger',
              title: tError('authError'),
              body: result.error,
            })
          }
        }
      }
    } catch (error: any) {
      showToast({
        variant: 'danger',
        title: tError('authError'),
        body: error.message || tError('authErrorMessage'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUseBackupCode = () => {
    setUseBackupCode(!useBackupCode)
    methods.setValue('useBackupCode', !useBackupCode)
    methods.setValue('code', '') // Clear the code when switching
  }

  const handleCodeChange = (value: string, onChange: (value: string) => void) => {
    // Only allow digits and limit to appropriate length
    const maxLength = useBackupCode ? 8 : 6
    const numericValue = value.replace(/\D/g, '').slice(0, maxLength)
    onChange(numericValue)
  }

  return {
    methods,
    isLoading,
    useBackupCode,
    onSubmit,
    handleUseBackupCode,
    handleCodeChange,
    onBackToPassword,
    email,
  }
}
