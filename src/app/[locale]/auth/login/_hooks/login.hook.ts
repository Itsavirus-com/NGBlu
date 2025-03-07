import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, useSearchParams } from 'next/navigation'
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
      if (response.ok) {
        router.push(`/dashboard`)
      }
    } catch (error: any) {
      console.error('Login failed:', error)
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
