import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { EndClient } from './models/end-client.type'

export const useEndClient = (endClientId?: number) => {
  const { data, mutate, isLoading } = useSWR<EndClient>(
    () =>
      endClientId && {
        path: `end-clients/${endClientId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
