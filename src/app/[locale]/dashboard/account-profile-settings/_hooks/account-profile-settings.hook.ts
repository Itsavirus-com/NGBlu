import { yupResolver } from '@hookform/resolvers/yup'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { EMAIL_UPDATES_STORAGE_KEY, MAX_EMAIL_UPDATES_PER_DAY } from '@/constants/email'
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
  const [emailUpdatesRemaining, setEmailUpdatesRemaining] = useState(MAX_EMAIL_UPDATES_PER_DAY)
  const [pendingProfileData, setPendingProfileData] = useState<ProfileFormType | null>(null)
  const [showEmailConfirmModal, setShowEmailConfirmModal] = useState(false)
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

  const updateEmailAttemptCounter = () => {
    const storedData = localStorage.getItem(EMAIL_UPDATES_STORAGE_KEY)
    const today = new Date()

    if (storedData) {
      const { attempts } = JSON.parse(storedData)
      const newAttempts = attempts + 1
      localStorage.setItem(
        EMAIL_UPDATES_STORAGE_KEY,
        JSON.stringify({ attempts: newAttempts, date: today })
      )
      setEmailUpdatesRemaining(MAX_EMAIL_UPDATES_PER_DAY - newAttempts)
    } else {
      localStorage.setItem(EMAIL_UPDATES_STORAGE_KEY, JSON.stringify({ attempts: 1, date: today }))
      setEmailUpdatesRemaining(MAX_EMAIL_UPDATES_PER_DAY - 1)
    }
  }

  const onSubmitProfile = async (data: ProfileFormType) => {
    // Check if email is being updated
    const isEmailUpdated = userProfile && data.email !== userProfile.email

    // If email is changing, show confirmation modal
    if (isEmailUpdated) {
      setPendingProfileData(data)
      setShowEmailConfirmModal(true)
      return
    }

    // Proceed with normal update if email is not changed
    await submitProfileChanges(data, false)
  }

  const confirmEmailChange = async () => {
    if (!pendingProfileData) return

    setShowEmailConfirmModal(false)
    await submitProfileChanges(pendingProfileData, true)
    setPendingProfileData(null)
  }

  const cancelEmailChange = () => {
    setShowEmailConfirmModal(false)
    setPendingProfileData(null)

    // Reset email field back to original
    if (userProfile) {
      profileMethods.setValue('email', userProfile.email || '')
    }
  }

  const submitProfileChanges = async (data: ProfileFormType, isEmailUpdate: boolean) => {
    setIsSubmittingProfile(true)
    const profileData = omitNullAndUndefined(data)

    try {
      const response = await userProfileApi.update(profileData)

      if (response.ok) {
        handleSuccessfulUpdate(data, isEmailUpdate)
      }
    } catch (error: any) {
      handleUpdateError(error, isEmailUpdate)
    } finally {
      setIsSubmittingProfile(false)
    }
  }

  const revertEmailField = () => {
    if (userProfile) {
      profileMethods.setValue('email', userProfile.email || '')
    }
  }

  const handleSuccessfulUpdate = (data: ProfileFormType, isEmailUpdate: boolean) => {
    // Update email attempt counter if needed
    if (isEmailUpdate) {
      updateEmailAttemptCounter()
    }

    showToast({
      variant: 'success',
      title: t('profileUpdated'),
      body: t('profileUpdateSuccess'),
    })

    // Refresh user profile data
    mutate()

    // Update form values
    updateFormValues(data)
  }

  const updateFormValues = (data: ProfileFormType) => {
    profileMethods.setValue('firstname', data.firstname)
    profileMethods.setValue('lastname', data.lastname)
    profileMethods.setValue('phoneNumber', data.phoneNumber)
    profileMethods.setValue('email', data.email)
  }

  const handleUpdateError = (error: any, isEmailUpdate: boolean) => {
    showToast({
      variant: 'danger',
      title: t('profileUpdateError'),
      body: error.message ?? t('profileUpdateErrorMessage'),
    })

    // Reset email field on error if it was an email update
    if (isEmailUpdate) {
      revertEmailField()
    }

    // Handle too many attempts error
    if (error.message === 'Too many reset attempts. Please try again later.') {
      setTimeout(() => {
        signOut()
      }, 2000)
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

  // Get remaining email update attempts from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem(EMAIL_UPDATES_STORAGE_KEY)

      if (storedData) {
        const { attempts, date } = JSON.parse(storedData)
        const lastAttemptDate = new Date(date).setHours(0, 0, 0, 0)
        const today = new Date().setHours(0, 0, 0, 0)

        // Reset counter if it's a new day
        if (lastAttemptDate < today) {
          setEmailUpdatesRemaining(MAX_EMAIL_UPDATES_PER_DAY)
          localStorage.removeItem(EMAIL_UPDATES_STORAGE_KEY)
        } else {
          setEmailUpdatesRemaining(MAX_EMAIL_UPDATES_PER_DAY - attempts)
        }
      }
    }
  }, [])

  return {
    isLoading,
    isSubmittingProfile,
    isSubmittingPassword,
    profileMethods,
    passwordMethods,
    userProfile,
    onSubmitProfile,
    onSubmitPassword,
    emailUpdatesRemaining,
    showEmailConfirmModal,
    confirmEmailChange,
    cancelEmailChange,
    maxEmailUpdatesPerDay: MAX_EMAIL_UPDATES_PER_DAY,
  }
}

export default useAccountProfileSettings
