import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { businessPartnerUserApi } from '@/services/api/business-partner-user-api'
import { useBusinessPartnerUser } from '@/services/swr/use-business-partner-user'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/business-partner-user-form.schema'

export default function useBusinessPartnerUserForm(businessPartnerId: number, userId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const {
    data: user,
    isLoading,
    mutate: invalidateCache,
  } = useBusinessPartnerUser(businessPartnerId, userId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: user && {
      ouUnitId: user.ouUnitId,
      userId: user.user.id,
      personId: user.person.id,
    },
  })

  const addNewBusinessPartnerUser = async (data: InferType<typeof schema>) => {
    try {
      const res = await businessPartnerUserApi.new(businessPartnerId, {
        ...data,
        businesspartnerId: businessPartnerId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner user created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateBusinessPartnerUser = async (data: InferType<typeof schema>) => {
    if (!userId) return

    try {
      const res = await businessPartnerUserApi.update(businessPartnerId, userId, {
        ...data,
        businesspartnerId: businessPartnerId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner user updated successfully' })
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
      return updateBusinessPartnerUser(submitData)
    }

    return addNewBusinessPartnerUser(submitData)
  }

  return { methods, onSubmit, isLoading }
}
