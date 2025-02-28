import { yupResolver } from '@hookform/resolvers/yup'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'

import { schema } from '../_schemas/login.schema'

export const useLogin = () => {
  const { showToast } = useToast()
  const searchParams = useSearchParams()
  const methods = useForm({ resolver: yupResolver(schema) })
  const tError = useTranslations('common.error')
  const toastShownRef = useRef(false)

  const onSubmit = (data: any) => {
    // TODO: Implement Integration with API later
    console.log(data)
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

  return { methods, onSubmit }
}
