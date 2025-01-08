import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { Service } from './models/service.type'

export const useService = (serviceId?: number) => {
  const { data, mutate, isLoading } = useSWR<Service>(
    () =>
      serviceId && {
        path: `services/${serviceId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
