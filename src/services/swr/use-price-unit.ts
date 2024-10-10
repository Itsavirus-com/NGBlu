import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { PriceUnit } from './models/price-unit.type'

export const usePriceUnit = (typeId?: number) => {
  const { data, mutate, isLoading } = useSWR<PriceUnit>(
    () =>
      typeId && {
        path: `prices/units/${typeId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
