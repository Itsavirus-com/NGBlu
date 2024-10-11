import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { ProductType } from './models/product-type.type'

export const useProductType = (typeId?: number) => {
  const { data, mutate, isLoading } = useSWR<ProductType>(
    () =>
      typeId && {
        path: `products/types/${typeId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
