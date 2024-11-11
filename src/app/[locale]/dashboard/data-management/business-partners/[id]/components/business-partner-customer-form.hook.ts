import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { businessPartnerCustomerApi } from '@/services/api/business-partner-customer-api'
import { useBusinessPartnerCustomer } from '@/services/swr/use-business-partner-customer'
import { InferType } from '@/utils/typescript'

export default function useBusinessPartnerCustomerForm(
  businessPartnerId: number,
  customerId?: number
) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: customer } = useBusinessPartnerCustomer(businessPartnerId, customerId)

  const schema = yup.object().shape({
    endclientId: yup.number().required(),
    enterpriseRootId: yup.number().required(),
    businesspartnersAddressesId: yup.number().required(),
    ouUnitId: yup.number(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: customer && {
      ...customer,
      businesspartnersAddressesId: customer.businesspartnerAddressId,
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
        back()
      }
    } catch (error) {
      showUnexpectedToast()
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
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = (data: InferType<typeof schema>) => {
    if (customerId) {
      return updateBusinessPartnerCustomer(data)
    }

    return addNewBusinessPartnerCustomer(data)
  }

  return { methods, onSubmit }
}
