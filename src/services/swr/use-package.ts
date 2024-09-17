import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { Package } from './models/package.type'

export const usePackage = (packageId: number) => {
  const { data, mutate, isLoading } = useSWR<Package>(
    {
      path: `packages/${packageId}`,
    },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
