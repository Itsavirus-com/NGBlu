import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { PricePlan } from './models/price-plan.type'

export const usePricePlan = (planId?: number) => {
  const { data, mutate, isLoading } = useSWR<PricePlan>(
    () =>
      planId && {
        path: `prices/plans/${planId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
