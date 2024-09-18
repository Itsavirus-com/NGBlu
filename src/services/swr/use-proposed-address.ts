import useSWR from 'swr'

import { collectionAdaptor } from './middleware/collection-adaptor'
import { ProposedAddressCollection } from './models/proposed-address.type'

export const useProposedAddress = (provider: 'kvk' | 'google', page = 1) => {
  const { data, mutate } = useSWR<ProposedAddressCollection>(
    {
      path: 'address-validations',
      params: { provider, limit: 1, page },
    },
    {
      use: [
        collectionAdaptor({
          collectionName: 'addresses',
        }),
      ],
    }
  )

  return { data: data, mutate }
}
