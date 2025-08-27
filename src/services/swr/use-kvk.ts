import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { KvkResponse } from './models/kvk.type'

export const useKvk = (kvkNumber?: string) => {
  const { data, error, isLoading, mutate } = useSWR<KvkResponse>(
    () =>
      kvkNumber && {
        path: `kvk/${kvkNumber}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
    isSuccess: !!data?.success,
  }
}
