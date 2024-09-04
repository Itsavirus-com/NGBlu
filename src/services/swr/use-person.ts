import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { Person } from './models/person.type'

export const usePerson = (personId: number) => {
  const { data, mutate, isLoading } = useSWR<Person>(
    {
      path: `persons/${personId}`,
    },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
