import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { ContactType } from './models/contact-type.type'

export const useContactType = (typeId?: number) => {
  const { data, mutate, isLoading } = useSWR<ContactType>(
    () =>
      typeId && {
        path: `contacts/types/${typeId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
