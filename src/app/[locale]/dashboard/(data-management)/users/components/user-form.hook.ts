import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { userApi } from '@/services/api/user-api'
import { useUser } from '@/services/swr/use-user'
import { InferType } from '@/utils/typescript'

export default function useUserForm(userId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: user } = useUser(userId)

  const schema = yup.object().shape({
    displayName: yup.string().ensure().required(),
    email: yup.string().ensure().required(),
    password: yup.string().ensure().min(12),
    personId: yup.number(),
    blocked: yup.boolean(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: user && {
      ...user,
      blocked: Boolean(user.blockedAt),
    },
  })

  const addNewUser = async (data: InferType<typeof schema>) => {
    try {
      const res = await userApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'User created successfully' })
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
    if (userId) {
      return updateUser(data)
    }

    return addNewUser(data)
  }

  return { methods, onSubmit, blockUser }
}
