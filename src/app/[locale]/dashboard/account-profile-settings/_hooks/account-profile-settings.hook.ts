import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { userProfileApi } from '@/services/api/user-profile-api'
import { useUserProfile } from '@/services/swr/use-user-profile'
import { omitNullAndUndefined } from '@/utils/object'

import { PasswordFormType, passwordSchema } from '../_schemas/password.schema'
import { ProfileFormType, profileSchema } from '../_schemas/profile.schema'

const useAccountProfileSettings = () => {
  const t = useTranslations('account')
  const { showToast } = useToast()

  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false)
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false)
  const { data: userProfile, isLoading, mutate } = useUserProfile()

  // Profile-specific form (for validating just the profile fields)
  const profileMethods = useForm<ProfileFormType>({
    resolver: yupResolver(profileSchema),
    values: userProfile && {
      firstname: userProfile.firstname ?? '',
      lastname: userProfile.lastname ?? '',
      email: userProfile.email ?? '',
      phoneNumber: userProfile.phoneNumber ?? '',
      roles: userProfile.roles.join(', ') ?? [],
    },
  })

  // Password-specific form (for validating just password fields)
  const passwordMethods = useForm<PasswordFormType>({
    resolver: yupResolver(passwordSchema),
    values: userProfile && {
      currentPassword: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const onSubmitProfile = async (data: ProfileFormType) => {
    setIsSubmittingProfile(true)
    const profileData = omitNullAndUndefined(data)

    try {
      const response = await userProfileApi.update(profileData)

      if (response.ok) {
        showToast({
          variant: 'success',
          title: t('profileUpdated'),
          body: t('profileUpdateSuccess'),
        })
        // Refresh user profile data
        mutate()

        // Update main form values
        profileMethods.setValue('firstname', data.firstname)
        profileMethods.setValue('lastname', data.lastname)
        profileMethods.setValue('phoneNumber', data.phoneNumber)
        profileMethods.setValue('email', data.email)
      }
    } catch (error: any) {
      showToast({
        variant: 'danger',
        title: t('profileUpdateError'),
        body: error.message ?? t('profileUpdateErrorMessage'),
      })
    } finally {
      setIsSubmittingProfile(false)
    }
  }

  const onSubmitPassword = async (data: PasswordFormType) => {
    setIsSubmittingPassword(true)
    const passwordData = omitNullAndUndefined(data)
    try {
      const response = await userProfileApi.updatePassword(passwordData)

      if (response.ok) {
        showToast({
          variant: 'success',
          title: t('passwordUpdated'),
          body: t('passwordUpdateSuccess'),
        })

        // Clear password fields
        passwordMethods.reset({
          currentPassword: '',
          password: '',
          passwordConfirmation: '',
        })

        // Also clear in the main form
        passwordMethods.setValue('currentPassword', '')
        passwordMethods.setValue('password', '')
        passwordMethods.setValue('passwordConfirmation', '')
      }
    } catch (error: any) {
      showToast({
        variant: 'danger',
        title: t('passwordUpdateError'),
        body: error.message ?? t('passwordUpdateErrorMessage'),
      })
    } finally {
      setIsSubmittingPassword(false)
    }
  }

  return {
    isLoading,
    isSubmittingProfile,
    isSubmittingPassword,
    profileMethods,
    passwordMethods,
    onSubmitProfile,
    onSubmitPassword,
  }
}

export default useAccountProfileSettings
