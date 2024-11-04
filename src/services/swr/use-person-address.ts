import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { PersonAddress } from './models/person-address.type'

export const usePersonAddress = (personId: number, addressId?: number) => {
  const { data, mutate, isLoading } = useSWR<PersonAddress>(
    () =>
      addressId && {
        path: `persons/${personId}/addresses/${addressId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
