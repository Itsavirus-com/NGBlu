import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { EndClientType } from './models/end-client-type.type'

export const useEndClientType = (typeId?: number) => {
  const { data, mutate, isLoading } = useSWR<EndClientType>(
    () =>
      typeId && {
        path: `end-clients/types/${typeId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
