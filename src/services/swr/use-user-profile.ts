import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { User } from './models/user.type'

export const useUserProfile = () => {
  const { data, mutate, isLoading } = useSWR<User>(
    {
      path: 'users/profile',
    },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
