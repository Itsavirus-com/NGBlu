import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { PackageType } from './models/package-type.type'

export const usePackageType = (typeId?: number) => {
  const { data, mutate, isLoading } = useSWR<PackageType>(
    () =>
      typeId && {
        path: `packages/types/${typeId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
