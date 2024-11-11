import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { BusinessPartnerUser } from './models/business-partner-user.type'

export const useBusinessPartnerUser = (businessPartnerId: number, userId?: number) => {
  const { data, mutate, isLoading } = useSWR<BusinessPartnerUser>(
    () =>
      businessPartnerId &&
      userId && {
        path: `business-partners/${businessPartnerId}/users/${userId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
