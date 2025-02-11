import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { userApi } from '@/services/api/user-api'
import { useUser } from '@/services/swr/use-user'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/user-form.schema'

export default function useUserForm(userId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: user, mutate: invalidateCache } = useUser(userId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: user && {
      displayName: user.displayName,
      email: user.email,
      password: '',
      personId: user.personId,
      blocked: Boolean(user.blockedAt),
    },
  })

  const addNewUser = async (data: InferType<typeof schema>) => {
    try {
      const res = await userApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'User created successfully' })
        invalidateCache()
        back()
      } else {
        showUnexpectedToast()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateUser = async (data: InferType<typeof schema>) => {
    if (!userId) return

    try {
      const res = await userApi.update(userId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'User updated successfully' })
        invalidateCache()
        back()
      } else {
        showUnexpectedToast()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

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
          body: data ? 'User blocked successfully' : 'User unblocked successfully',
        })
      } else {
        showUnexpectedToast()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)
    if (userId) {
      return updateUser(submitData)
    }

    return addNewUser(submitData)
  }

  return { methods, onSubmit, blockUser }
}
