import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { PriceTax } from './models/price-tax.type'

export const usePriceTax = (taxId?: number) => {
  const { data, mutate, isLoading } = useSWR<PriceTax>(
    () =>
      taxId && {
        path: `prices/taxes/${taxId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
