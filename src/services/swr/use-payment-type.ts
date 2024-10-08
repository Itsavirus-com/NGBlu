import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { PaymentType } from './models/payment-type.type'

export const usePaymentType = (typeId?: number) => {
  const { data, mutate, isLoading } = useSWR<PaymentType>(
    () =>
      typeId && {
        path: `payments/types/${typeId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
