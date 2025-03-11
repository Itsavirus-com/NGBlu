import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { SetInitialPassword } from './models/set-initial-password'

export const useSetInitialPassword = () => {
  const { data, mutate, isLoading } = useSWR<SetInitialPassword>(
    () => ({
      path: 'users/profile/set-initial-password',
    }),
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
