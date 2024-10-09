import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { Country } from './models/country.type'

export const useCountry = (countryId?: number) => {
  const { data, mutate, isLoading } = useSWR<Country>(
    () =>
      countryId && {
        path: `countries/${countryId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
