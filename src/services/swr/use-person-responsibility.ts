import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { PersonResponsibility } from './models/person-responsibility.type'

export const usePersonResponsibility = (id?: number) => {
  const { data, mutate, isLoading } = useSWR<PersonResponsibility>(
    () =>
      id && {
        path: `persons/responsibilities/${id}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
