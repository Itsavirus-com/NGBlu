import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { EndClientStatus } from './models/end-client-status.type'

export const useEndClientStatus = (typeId?: number) => {
  const { data, mutate, isLoading } = useSWR<EndClientStatus>(
    () =>
      typeId && {
        path: `end-clients/statuses/${typeId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
