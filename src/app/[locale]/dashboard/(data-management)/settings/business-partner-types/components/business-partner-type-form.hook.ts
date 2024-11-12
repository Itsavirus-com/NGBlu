import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { businessPartnerTypeApi } from '@/services/api/business-partner-type-api'
import { useBusinessPartnerType } from '@/services/swr/use-business-partner-type'
import { InferType } from '@/utils/typescript'

export default function useBusinessPartnerTypeForm(businessPartnerTypeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: businessPartnerType } = useBusinessPartnerType(businessPartnerTypeId)

  const schema = yup.object().shape({
    name: yup.string().ensure().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: businessPartnerType,
  })

  const addNewBusinessPartnerType = async (data: InferType<typeof schema>) => {
    try {
      const res = await businessPartnerTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner type created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateBusinessPartnerType = async (data: InferType<typeof schema>) => {
    if (!businessPartnerTypeId) return

    try {
      const res = await businessPartnerTypeApi.update(businessPartnerTypeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner type updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (businessPartnerTypeId) {
      return updateBusinessPartnerType(data)
    }

    return addNewBusinessPartnerType(data)
  }

  return { methods, onSubmit }
}
