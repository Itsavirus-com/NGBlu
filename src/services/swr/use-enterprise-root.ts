import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { EnterpriseRoot } from './models/enterprise-root.type'

export const useEnterpriseRoot = (enterpriseRoot?: number) => {
  const { data, mutate, isLoading } = useSWR<EnterpriseRoot>(
    () =>
      enterpriseRoot && {
        path: `enterprise-roots/${enterpriseRoot}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
