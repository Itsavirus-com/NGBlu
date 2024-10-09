import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { ServiceType } from './models/service-type.type'

export const useServiceType = (typeId?: number) => {
  const { data, mutate, isLoading } = useSWR<ServiceType>(
    () =>
      typeId && {
        path: `services/types/${typeId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
