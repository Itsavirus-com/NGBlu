import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { BusinessPartner } from './models/business-partner.type'

export const useBusinessPartner = (id?: number) => {
  const { data, mutate, isLoading } = useSWR<BusinessPartner>(
    () =>
      id && {
        path: `business-partners/${id}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
