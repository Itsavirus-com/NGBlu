import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { CreditCardType } from './models/credit-card-type.type'

export const useCreditCardType = (typeId?: number) => {
  const { data, mutate, isLoading } = useSWR<CreditCardType>(
    () =>
      typeId && {
        path: `credit-cards/types/${typeId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
