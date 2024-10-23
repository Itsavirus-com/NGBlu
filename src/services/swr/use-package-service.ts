import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { PackageService } from './models/package.type'

export const usePackageService = (packageId: number, packageServiceId?: number) => {
  const { data, mutate, isLoading } = useSWR<PackageService>(
    () =>
      packageServiceId && {
        path: `packages/${packageId}/services/${packageServiceId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
