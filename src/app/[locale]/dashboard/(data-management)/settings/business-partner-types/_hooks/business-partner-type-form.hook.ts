import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { businessPartnerTypeApi } from '@/services/api/business-partner-type-api'
import { useBusinessPartnerType } from '@/services/swr/use-business-partner-type'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/business-partner-type-form.schema'

export default function useBusinessPartnerTypeForm(businessPartnerTypeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: businessPartnerType, mutate: invalidateCache } =
    useBusinessPartnerType(businessPartnerTypeId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: businessPartnerType && {
      name: businessPartnerType?.name ?? '',
    },
  })

  const addNewBusinessPartnerType = async (data: InferType<typeof schema>) => {
    try {
      const res = await businessPartnerTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner type created successfully' })
        invalidateCache()
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
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (businessPartnerTypeId) {
      return updateBusinessPartnerType(submitData)
    }

    return addNewBusinessPartnerType(submitData)
  }

  return { methods, onSubmit }
}
