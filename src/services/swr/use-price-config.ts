import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { PriceConfig } from './models/price-config.type'

export const usePriceConfig = (configId?: number) => {
  const { data, mutate, isLoading } = useSWR<PriceConfig>(
    () =>
      configId && {
        path: `prices/configs/${configId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
