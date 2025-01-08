import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { Product } from './models/product.type'

export const useProduct = (productId?: number) => {
  const { data, mutate, isLoading } = useSWR<Product>(
    () =>
      productId && {
        path: `products/${productId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
