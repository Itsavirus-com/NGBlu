import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { Payment } from './models/payment.type'

export const usePayment = (paymentId?: number, selectedPayment?: string) => {
  const { data, mutate, isLoading } = useSWR<Payment>(
    () =>
      paymentId && selectedPayment
        ? {
            path: `payments/details/${selectedPayment}/${paymentId}`,
          }
        : null,
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
