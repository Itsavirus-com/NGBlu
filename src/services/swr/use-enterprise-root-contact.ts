import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { EnterpriseRootContact } from './models/enterprise-root-contact.type'

export const useEnterpriseRootContact = (enterpriseRoot?: number, contactId?: number) => {
  const { data, mutate, isLoading } = useSWR<EnterpriseRootContact>(
    () =>
      enterpriseRoot &&
      contactId && {
        path: `enterprise-roots/${enterpriseRoot}/contacts/${contactId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
