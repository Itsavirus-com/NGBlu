import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { Address } from './models/address.type'

export const useAddress = (addressId?: number) => {
  const { data, mutate, isLoading } = useSWR<Address>(
    () =>
      addressId && {
        path: `addresses/${addressId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
