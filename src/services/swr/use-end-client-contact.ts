import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { EndClientContact } from './models/end-client-contact.type'

export const useEndClientContact = (endClientId?: number, contactId?: number) => {
  const { data, mutate, isLoading } = useSWR<EndClientContact>(
    () =>
      endClientId &&
      contactId && {
        path: `end-clients/${endClientId}/contacts/${contactId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
