import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { Gender } from './models/gender.type'

export const useGender = (genderId?: number) => {
  const { data, mutate, isLoading } = useSWR<Gender>(
    () =>
      genderId && {
        path: `genders/${genderId}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
