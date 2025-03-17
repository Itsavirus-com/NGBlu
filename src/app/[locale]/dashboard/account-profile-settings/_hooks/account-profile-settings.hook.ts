import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InferType } from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { userProfileApi } from '@/services/api/user-profile-api'
import { useUserProfile } from '@/services/swr/use-user-profile'
import { omitNullAndUndefined } from '@/utils/object'

import { schema } from '../_schemas/account-profile-settings.schema'

export type UserProfileType = InferType<typeof schema>

const useAccountProfileSettings = () => {
  const t = useTranslations('account')
  const { showToast } = useToast()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: userProfile, isLoading } = useUserProfile()

  const methods = useForm<UserProfileType>({
    resolver: yupResolver(schema),
    values: userProfile && {
      firstName: userProfile.firstname ?? '',
      lastName: userProfile.lastname ?? '',
      email: userProfile.email ?? '',
      phoneNumber: userProfile.phoneNumber ?? '',
      roles: userProfile.roles.join(', ') ?? [],
      password: '',
    },
  })

  const onSubmit = async (data: UserProfileType) => {
    setIsSubmitting(true)
    const { roles, ...dataToSubmit } = data
    const submitData = omitNullAndUndefined(dataToSubmit)

    try {
      const response = await userProfileApi.update(userProfile?.id as number, submitData)

      if (response.ok) {
        showToast({
          variant: 'success',
          title: t('profileUpdated'),
          body: t('profileUpdateSuccess'),
        })
      }
    } catch (error) {
      showToast({
        variant: 'danger',
        title: t('profileUpdateError'),
        body: t('profileUpdateErrorMessage'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isLoading,
    isSubmitting,
    methods,
    onSubmit,
  }
}

export default useAccountProfileSettings
