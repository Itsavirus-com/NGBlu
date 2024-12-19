import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { businessPartnerUserApi } from '@/services/api/business-partner-user-api'
import { useBusinessPartnerUser } from '@/services/swr/use-business-partner-user'
import { InferType } from '@/utils/typescript'

export default function useBusinessPartnerUserForm(businessPartnerId: number, userId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: user } = useBusinessPartnerUser(businessPartnerId, userId)

  const schema = yup.object().shape({
    userId: yup.number().required(),
    personId: yup.number().required(),
    ouUnitId: yup.number(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: user && {
      ...user,
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
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = (data: InferType<typeof schema>) => {
    if (userId) {
      return updateBusinessPartnerUser(data)
    }

    return addNewBusinessPartnerUser(data)
  }

  return { methods, onSubmit }
}
