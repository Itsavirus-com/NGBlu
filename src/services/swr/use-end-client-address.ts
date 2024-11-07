import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { EndClientAddress } from './models/end-client-address.type'

export const useEndClientAddress = (endClientId?: number, addressId?: number) => {
  const { data, mutate, isLoading } = useSWR<EndClientAddress>(
    () =>
      endClientId &&
      addressId && {
        path: `end-clients/${endClientId}/addresses/${addressId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
