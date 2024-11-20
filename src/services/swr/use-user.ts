import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { User } from './models/user.type'

export const useUser = (userId?: number) => {
  const { data, mutate } = useSWR<User>(
    () =>
      userId && {
        path: `users/${userId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate }
}
