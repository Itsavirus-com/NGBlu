import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { ProductPriceConfig } from './models/product.type'

export const useProductPriceConfig = (productId?: number) => {
  const { data, isLoading } = useSWR<ProductPriceConfig>(
    () =>
      productId && {
        path: `products/price-configs/${productId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, isLoading }
}
