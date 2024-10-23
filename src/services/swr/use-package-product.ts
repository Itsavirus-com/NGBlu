import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { PackageProduct } from './models/package.type'

export const usePackageProduct = (packageId: number, packageProductId?: number) => {
  const { data, mutate, isLoading } = useSWR<PackageProduct>(
    () =>
      packageProductId && {
        path: `packages/${packageId}/products/${packageProductId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
