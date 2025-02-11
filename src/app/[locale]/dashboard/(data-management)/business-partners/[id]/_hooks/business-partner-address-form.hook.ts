import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { businessPartnerAddressApi } from '@/services/api/business-partner-address-api'
import { useBusinessPartnerAddress } from '@/services/swr/use-business-partner-address'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/business-partner-address-form.schema'

export default function useBusinessPartnerAddressForm(
  businessPartnerId: number,
  addressId?: number
) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const {
    data: businessPartnerAddress,
    isLoading,
    mutate: invalidateCache,
  } = useBusinessPartnerAddress(businessPartnerId, addressId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: businessPartnerAddress && {
      addressId: businessPartnerAddress?.address?.id ?? 0,
      addressTypeId: businessPartnerAddress?.addressType?.id ?? 0,
      ouUnitId: businessPartnerAddress?.ouUnitId ?? 0,
    },
  })

  const addNewBusinessPartnerAddress = async (data: InferType<typeof schema>) => {
    try {
      const res = await businessPartnerAddressApi.new(businessPartnerId, {
        ...data,
        businesspartnerId: businessPartnerId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner address created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateBusinessPartnerAddress = async (data: InferType<typeof schema>) => {
    if (!addressId) return

    try {
      const res = await businessPartnerAddressApi.update(businessPartnerId, addressId, {
        ...data,
        businesspartnerId: businessPartnerId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner address updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (addressId) {
      return updateBusinessPartnerAddress(submitData)
    }

    return addNewBusinessPartnerAddress(submitData)
  }

  return { methods, onSubmit, isLoading }
}
