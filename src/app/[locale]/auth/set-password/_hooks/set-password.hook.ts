import { yupResolver } from '@hookform/resolvers/yup'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { TokenType } from '@/constants/token-type'
import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { setInitialPasswordApi } from '@/services/api/set-initial-password-api'
import { validateTokenUserApi } from '@/services/api/validate-token-user-api'
import { InferType } from '@/utils/typescript'


import { schema } from '../_schemas/set-password.schema'

export default function useSetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations('auth.setPassword')
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading, withLoading } = useLoading()
  const [isValidating, setIsValidating] = useState(true)
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null)
  const toastShownRef = useRef(false)
  const token = searchParams.get('token')

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const getPasswordStrength = (password: string) => {
    if (!password) return 0

    // Only check for minimum length of 12 characters
    if (password.length >= 12) return 100

    // Calculate partial strength based on length
    return Math.min(Math.floor((password.length / 12) * 100), 99)
  }

  const getStrengthColor = (strength: number) => {
    if (strength < 50) return 'danger'
    if (strength < 100) return 'warning'
    return 'success'
  }

  const getStrengthText = (strength: number) => {
    if (strength < 50) return 'Weak'
    if (strength < 100) return 'Good'
    return 'Strong'
  }

  const checkTokenToast = () => {
    if (!token) {
      if (!toastShownRef.current) {
        showToast({
          variant: 'danger',
          body: t('invalidOrMissingToken'),
        })
        toastShownRef.current = true
      }
      setIsTokenValid(false)
      router.push('/auth/login')
      return
    }
  }

  const onSubmit = async (data: any) => {
    return withLoading(async () => {
      try {
        // Validate password strength
        const passwordStrength = getPasswordStrength(data.newPassword)
        if (passwordStrength < 100) {
          showToast({
            variant: 'danger',
            body: t('passwordTooWeak'),
          })
          return
        }

        checkTokenToast()

        // Call API to set password with token
        const response = await setInitialPasswordApi.new({
          token,
          password: data.newPassword,
        })

        if (response.ok) {
          showToast({
            variant: 'success',
            body: t('success'),
          })

          // Redirect to login after successful setup
          router.push('/auth/login')
        }
      } catch (error) {
        showUnexpectedToast()
      }
    })
  }

  const validateToken = useCallback(async () => {
    try {
      setIsValidating(true)
      checkTokenToast()

      // Call API to validate token
      const response = await validateTokenUserApi.new({
        token,
        tokenType: TokenType.EMAIL_ACTIVATION,
      })

      if (response.ok) {
        setIsTokenValid(true)
      }
    } catch (error) {
      if (!toastShownRef.current) {
        showToast({
          variant: 'danger',
          body: t('invalidOrExpiredToken'),
        })
        toastShownRef.current = true
      }
      setIsTokenValid(false)
      router.push('/auth/login')
    } finally {
      setIsValidating(false)
    }
  }, [searchParams])

  // Validate token when component mounts
  useEffect(() => {
    validateToken()
  }, [validateToken])

  return {
    methods,
    onSubmit,
    isLoading,
    isValidating,
    isTokenValid,
    getPasswordStrength,
    getStrengthColor,
    getStrengthText,
  }
}
