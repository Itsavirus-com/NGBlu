import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { Contact } from './models/contact.type'

export const usePersonContact = (contactId?: number) => {
  const { data, mutate, isLoading } = useSWR<Contact>(
    () =>
      contactId && {
        path: `contacts/infos/${contactId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
