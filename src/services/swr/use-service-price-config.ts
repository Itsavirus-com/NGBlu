import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { ServicePriceConfig } from './models/service.type'

export const useServicePriceConfig = (serviceId?: number) => {
  const { data, isLoading, mutate } = useSWR<ServicePriceConfig>(
    () =>
      serviceId && {
        path: `services/price-configs/${serviceId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, isLoading, mutate }
}
