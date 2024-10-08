import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { Currency } from './models/currency.type'

export const useCurrency = (currencyId?: number) => {
  const { data, mutate, isLoading } = useSWR<Currency>(
    () =>
      currencyId && {
        path: `prices/currencies/${currencyId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
