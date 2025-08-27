import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import {
  ProductCategory,
  ProductCategoryHierarchyResponse,
  ProductLayer,
  ProductSubcategory,
} from './models/product-category.type'

// Re-export types for convenience
export type { ProductCategory, ProductLayer, ProductSubcategory }

export const useProductCategory = () => {
  const { data, error, isLoading, mutate } = useSWR<ProductCategoryHierarchyResponse>(
    {
      path: 'products/category-hierarchy',
    },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return {
    data: data as ProductLayer[] | undefined,
    error,
    isLoading,
    mutate,
    isSuccess: !!data?.success,
  }
}
