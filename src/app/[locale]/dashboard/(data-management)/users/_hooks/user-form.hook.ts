import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { userApi } from '@/services/api/user-api'
import { useTableData } from '@/services/swr/use-table-data'
import { useUser } from '@/services/swr/use-user'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/user-form.schema'

export default function useUserForm(userId?: number) {
  const t = useTranslations('dataManagement.users')
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading: isSubmitting, withLoading } = useLoading()
  const { data: user, mutate: invalidateCache } = useUser(userId)
  const { mutate: refreshUsersList } = useTableData('users')
  const [loadingResendEmail, setLoadingResendEmail] = useState<Record<string, boolean>>({})

  const isEdit = !!userId
  const userSchema = schema(isEdit)

  const methods = useForm<InferType<typeof userSchema>>({
    resolver: yupResolver(userSchema),
    values: user && {
      firstname: user?.firstname ?? '',
      lastname: user?.lastname ?? '',
      phoneNumber: user?.phoneNumber ?? '',
      email: user?.email ?? '',
      roles: user?.roles ?? [''],
      authType: user?.authType ?? undefined,
    },
  })

  const errorMessageInputType = methods.formState.errors.authType?.message

  const addNewUser = async (data: InferType<typeof userSchema>) => {
    try {
      const res = await userApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: t('userCreated') })
        invalidateCache()
        refreshUsersList()
        back()
      } else {
        showUnexpectedToast()
      }
    } catch (error: any) {
      if (error?.message) {
        showToast({ variant: 'danger', title: 'Error', body: error.message })
      } else {
        showUnexpectedToast()
      }
    }
  }

  const updateUser = async (data: InferType<typeof userSchema>) => {
    if (!userId) return
    try {
      const res = await userApi.update(userId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: t('userUpdated') })
        invalidateCache()
        refreshUsersList()
        back()
      } else {
        showUnexpectedToast()
      }
    } catch (error: any) {
      if (error?.message) {
        showToast({ variant: 'danger', title: 'Error', body: error.message })
      } else {
        showUnexpectedToast()
      }
    }
  }

  // TODO: Implement block user feature later if needed
  const blockUser = async (data: boolean) => {
    if (!userId) return
    methods.setValue('blocked', data)

    try {
      const body = data
        ? {
            blocked_at: new Date().toISOString(),
          }
        : {
            blocked_at: null,
          }

      const res = await userApi.blockUser(userId, body)

      if (res.ok) {
        showToast({
          variant: 'success',
          body: data ? t('userBlocked') : t('userUnblocked'),
        })
        refreshUsersList()
      } else {
        showUnexpectedToast()
      }
    } catch (error: any) {
      if (error?.message) {
        showToast({ variant: 'danger', title: 'Error', body: error.message })
      } else {
        showUnexpectedToast()
      }
    }
  }

  /**
   * Resends activation email to a user
   * @param email The email address of the user to send activation to
   * @param userId The ID of the user, used for tracking loading state
   * @returns Promise that resolves to a boolean indicating success/failure
   */
  const resendActivationEmail = async (
    email: string,
    userId: string | number
  ): Promise<boolean> => {
    // Convert userId to string to ensure consistent key type
    const userIdKey = userId.toString()

    try {
      // Set loading state for this specific user
      setLoadingResendEmail(prev => ({ ...prev, [userIdKey]: true }))

      const res = await userApi.resendActivationEmail(email)

      if (res.ok) {
        showToast({
          variant: 'success',
          body: t('resendEmailActivationSuccess'),
        })
        // Refresh the table data to show any updated status
        refreshUsersList()
        return true
      } else {
        showUnexpectedToast()
        return false
      }
    } catch (error: any) {
      if (error?.message) {
        showToast({ variant: 'danger', title: 'Error', body: error.message })
      } else {
        showUnexpectedToast()
      }
      return false
    } finally {
      // Always clear loading state when done
      setLoadingResendEmail(prev => ({ ...prev, [userIdKey]: false }))
    }
  }

  /**
   * Checks if resend activation email is in progress for a specific user
   * @param userId The ID of the user to check
   * @returns Boolean indicating if operation is in progress
   */
  const isResendingActivation = (userId: string | number): boolean => {
    return !!loadingResendEmail[userId.toString()]
  }

  const onSubmit = async (data: InferType<typeof userSchema>) => {
    const submitData = omitNullAndUndefined(data)
    if (userId) {
      return withLoading(() => updateUser(submitData))
    }

    return withLoading(() => addNewUser(submitData))
  }

  return {
    methods,
    onSubmit,
    blockUser,
    resendActivationEmail,
    isResendingActivation,
    isSubmitting,
    errorMessageInputType,
    isEdit,
  }
}
