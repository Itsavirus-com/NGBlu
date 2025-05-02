import useSWR, { SWRConfiguration } from 'swr'
import { derive } from 'valtio/utils'

import { collectionAdaptor } from './middleware/collection-adaptor'
import { AddressValidationData } from './models/address-validation.type'

export const useAddressValidation = (
  provider?: string,
  page = 1,
  limit = 1,
  config?: SWRConfiguration
) => {
  const { data, mutate, isLoading } = useSWR<AddressValidationData>(
    () =>
      provider && {
        path: `addresses/validations`,
        params: { provider, page, limit },
      },
    {
      use: [
        collectionAdaptor({
          collectionName: 'data',
          computeFn: () => derive({}),
          keyMapping: {
            // Map the API response fields to the expected format
            data: 'data',
            currentPage: 'pagination.currentPage',
            lastPage: 'pagination.lastPage',
            totalData: 'pagination.total',
            perPage: 'pagination.perPage',
          },
        }),
      ],
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 5000,
      ...config,
    }
  )

  return { data, mutate, isLoading }
}
