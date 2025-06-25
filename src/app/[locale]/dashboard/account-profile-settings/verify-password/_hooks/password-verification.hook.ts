import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { userProfileApi } from '@/services/api/user-profile-api'
import { useUserProfile } from '@/services/swr/use-user-profile'
import { passwordVerificationUtils } from '@/utils/password-verification'

import {
  PasswordVerificationFormType,
  passwordVerificationSchema,
} from '../_schemas/password-verification.schema'

export const usePasswordVerification = () => {
  const t = useTranslations('account')
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: userProfile, isLoading } = useUserProfile()

  const methods = useForm<PasswordVerificationFormType>({
    resolver: yupResolver(passwordVerificationSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = async (data: PasswordVerificationFormType) => {
    setIsSubmitting(true)

    try {
      const response = await userProfileApi.verifyPassword({
        currentPassword: data.password,
      })

      if (response.ok) {
        passwordVerificationUtils.setVerified()
        showToast({
          variant: 'success',
          title: t('passwordVerified'),
          body: t('passwordVerificationSuccess'),
        })
      }
    } catch (error: any) {
      showToast({
        variant: 'danger',
        title: t('verificationFailed'),
        body: error.message ?? t('verificationFailedMessage'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    methods,
    onSubmit,
    isSubmitting,
    isLoading,
    userProfile,
    isVerified: passwordVerificationUtils.isVerified(),
  }
}
