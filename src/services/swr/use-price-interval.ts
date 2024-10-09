import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { PriceInterval } from './models/price-interval.type'

export const usePriceInterval = (intervalId?: number) => {
  const { data, mutate, isLoading } = useSWR<PriceInterval>(
    () =>
      intervalId && {
        path: `prices/intervals/${intervalId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
