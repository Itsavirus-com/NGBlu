import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { BusinessPartnerContact } from './models/business-partner-contact.type'

export const useBusinessPartnerContact = (businessPartnerId: number, contactId?: number) => {
  const { data, mutate, isLoading } = useSWR<BusinessPartnerContact>(
    () =>
      businessPartnerId &&
      contactId && {
        path: `business-partners/${businessPartnerId}/contacts/${contactId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
