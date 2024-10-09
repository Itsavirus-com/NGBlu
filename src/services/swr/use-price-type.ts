import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { PriceType } from './models/price-type.type'

export const usePriceType = (typeId?: number) => {
  const { data, mutate, isLoading } = useSWR<PriceType>(
    () =>
      typeId && {
        path: `prices/types/${typeId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
