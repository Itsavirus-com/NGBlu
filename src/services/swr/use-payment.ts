import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { Payment } from './models/payment.type'

export const usePayment = (paymentId: number) => {
  const { data, mutate, isLoading } = useSWR<Payment>(
    {
      path: `payments/details/${paymentId}`,
    },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
