import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { requestPasswordResetApi } from '@/services/api/request-password-reset'

import { schema } from '../_schemas/request-pasword-reset.schema'
const useResetPassword = () => {
  const { showToast } = useToast()
  const t = useTranslations('auth.requestResetPassword')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { withLoading, isLoading: isSubmitting } = useLoading()

  const methods = useForm({ resolver: yupResolver(schema) })

  const handleSubmit = async (data: any) => {
    return withLoading(async () => {
      try {
        await requestPasswordResetApi.new(data)
        setIsSubmitted(true)
      } catch (err) {
        setIsSubmitted(false)
        showToast({
          variant: 'danger',
          body: t('error'),
        })
      }
    })
  }

  return { methods, isSubmitting, isSubmitted, handleSubmit }
}

export default useResetPassword
