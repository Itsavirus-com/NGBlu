import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { EnterpriseRootAddress } from './models/enterprise-root-address.type'

export const useEnterpriseRootAddress = (enterpriseRoot?: number, addressId?: number) => {
  const { data, mutate, isLoading } = useSWR<EnterpriseRootAddress>(
    () =>
      enterpriseRoot &&
      addressId && {
        path: `enterprise-roots/${enterpriseRoot}/addresses/${addressId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
