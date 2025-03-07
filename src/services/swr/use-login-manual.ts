import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { LoginManual } from './models/login-manual.type'

export const useLoginManual = () => {
  const { data, mutate, isLoading } = useSWR<LoginManual>(
    () => ({
      path: `login`,
    }),
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
