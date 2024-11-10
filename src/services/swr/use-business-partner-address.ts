import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { BusinessPartnerAddress } from './models/business-partner-address.type'

export const useBusinessPartnerAddress = (businessPartnerId?: number, addressId?: number) => {
  const { data, mutate, isLoading } = useSWR<BusinessPartnerAddress>(
    () =>
      businessPartnerId &&
      addressId && {
        path: `business-partners/${businessPartnerId}/addresses/${addressId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
