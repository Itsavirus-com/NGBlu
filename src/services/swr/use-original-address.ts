import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { Address } from './models/address.type'

export const useOriginalAddress = (addressId: string) => {
  const { data, mutate } = useSWR<Address>(
    {
      path: `addresses/${addressId}`,
    },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate }
}
