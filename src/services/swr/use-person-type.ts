import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { PersonType } from './models/person-type.type'

export const usePersonType = (typeId?: number) => {
  const { data, mutate, isLoading } = useSWR<PersonType>(
    () =>
      typeId && {
        path: `persons/types/${typeId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
