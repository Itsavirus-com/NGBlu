import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { EnterpriseRootUser } from './models/enterprise-root-user.type'

export const useEnterpriseRootUser = (enterpriseRoot?: number, userId?: number) => {
  const { data, mutate, isLoading } = useSWR<EnterpriseRootUser>(
    () =>
      enterpriseRoot &&
      userId && {
        path: `enterprise-roots/${enterpriseRoot}/users/${userId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
