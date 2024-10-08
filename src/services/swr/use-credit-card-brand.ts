import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { CreditCardBrand } from './models/credit-card-brand.type'

export const useCreditCardBrand = (brandId?: number) => {
  const { data, mutate, isLoading } = useSWR<CreditCardBrand>(
    () =>
      brandId && {
        path: `credit-cards/brands/${brandId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
