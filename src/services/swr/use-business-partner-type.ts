import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { BusinessPartnerType } from './models/business-partner-type.type'

export const useBusinessPartnerType = (typeId?: number) => {
  const { data, mutate, isLoading } = useSWR<BusinessPartnerType>(
    () =>
      typeId && {
        path: `business-partners/types/${typeId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
