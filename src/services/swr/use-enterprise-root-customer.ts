import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { EnterpriseRootCustomer } from './models/enterprise-root-customer.type'

export const useEnterpriseRootCustomer = (enterpriseRoot?: number, customerId?: number) => {
  const { data, mutate, isLoading } = useSWR<EnterpriseRootCustomer>(
    () =>
      enterpriseRoot &&
      customerId && {
        path: `enterprise-roots/${enterpriseRoot}/customers/${customerId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
