import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { AddressType } from './models/address-type.type'

export const useAddressType = (addressTypeId?: number) => {
  const { data, mutate, isLoading } = useSWR<AddressType>(
    () =>
      addressTypeId && {
        path: `addresses/types/${addressTypeId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
