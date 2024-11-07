import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { EndClientPaymentDetail } from './models/end-client-payment-detail.type'

export const useEndClientPaymentDetail = (endClientId?: number, paymentDetailId?: number) => {
  const { data, mutate, isLoading } = useSWR<EndClientPaymentDetail>(
    () =>
      endClientId &&
      paymentDetailId && {
        path: `end-clients/${endClientId}/payment-details/${paymentDetailId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
