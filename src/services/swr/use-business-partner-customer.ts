import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { BusinessPartnerCustomer } from './models/business-partner-customer.type'

export const useBusinessPartnerCustomer = (businessPartnerId: number, customerId?: number) => {
  const { data, mutate, isLoading } = useSWR<BusinessPartnerCustomer>(
    () =>
      businessPartnerId &&
      customerId && {
        path: `business-partners/${businessPartnerId}/customers/${customerId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
