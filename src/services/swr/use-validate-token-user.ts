import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { ValidateTokenUser } from './models/validate-token-user'

export const useValidateTokenUser = () => {
  const { data, mutate, isLoading } = useSWR<ValidateTokenUser>(
    () => ({
      path: 'users/profile/validate-token',
    }),
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
