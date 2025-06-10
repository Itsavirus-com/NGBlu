import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { businessPartnerCustomerApi } from '@/services/api/business-partner-customer-api'
import { useBusinessPartnerCustomer } from '@/services/swr/use-business-partner-customer'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/business-partner-customer-form.schema'

export default function useBusinessPartnerCustomerForm(
  businessPartnerId: number,
  customerId?: number
) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading: isSubmitting, withLoading } = useLoading()

  const {
    data: customer,
    isLoading,
    mutate: invalidateCache,
  } = useBusinessPartnerCustomer(businessPartnerId, customerId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: customer && {
      endclientId: customer?.endclientId ?? 0,
      businesspartnersAddressesId: customer?.businesspartnerAddressId ?? 0,
      ouUnitId: customer?.ouUnitId ?? 0,
    },
  })

  const addNewBusinessPartnerCustomer = async (data: InferType<typeof schema>) => {
    try {
      const res = await businessPartnerCustomerApi.new(businessPartnerId, {
        ...data,
        businesspartnerId: businessPartnerId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner customer created successfully' })
        invalidateCache()
        back()
      }
    } catch (error: any) {
      if (error?.message) {
        showToast({ variant: 'danger', title: 'Error', body: error.message })
      } else {
        showUnexpectedToast()
      }
    }
  }

  const updateBusinessPartnerCustomer = async (data: InferType<typeof schema>) => {
    if (!customerId) return

    try {
      const res = await businessPartnerCustomerApi.update(businessPartnerId, customerId, {
        ...data,
        businesspartnerId: businessPartnerId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner customer updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error: any) {
      if (error?.message) {
        showToast({ variant: 'danger', title: 'Error', body: error.message })
      } else {
        showUnexpectedToast()
      }
    }
  }

  const onSubmit = (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (customerId) {
      return withLoading(() => updateBusinessPartnerCustomer(submitData))
    }

    return withLoading(() => addNewBusinessPartnerCustomer(submitData))
  }

  return { methods, onSubmit, isLoading, isSubmitting }
}
