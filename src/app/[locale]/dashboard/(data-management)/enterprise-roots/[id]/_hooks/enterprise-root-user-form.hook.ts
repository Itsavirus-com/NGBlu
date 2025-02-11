import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { enterpriseRootUserApi } from '@/services/api/enterprise-root-user-api'
import { useEnterpriseRootUser } from '@/services/swr/use-enterprise-root-user'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/enterprise-root-user-form.schema'

export default function useEnterpriseRootUserForm(userId?: number) {
  const { id } = useParams()
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: user, mutate: invalidateCache } = useEnterpriseRootUser(Number(id), userId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: user && {
      ouUnitId: user.ouUnitId,
      personId: user.personId,
      userId: user.userId,
    },
  })

  const addNewEnterpriseRootUser = async (data: InferType<typeof schema>) => {
    try {
      const res = await enterpriseRootUserApi.new(Number(id), {
        ...data,
        enterpriseRootId: Number(id),
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Enterprise root user created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateEnterpriseRootUser = async (data: InferType<typeof schema>) => {
    if (!userId) return

    try {
      const res = await enterpriseRootUserApi.update(Number(id), userId, {
        ...data,
        enterpriseRootId: Number(id),
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Enterprise root user updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (userId) {
      return updateEnterpriseRootUser(submitData)
    }

    return addNewEnterpriseRootUser(submitData)
  }

  return { methods, onSubmit }
}
