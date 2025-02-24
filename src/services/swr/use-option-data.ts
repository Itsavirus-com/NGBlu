import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { AnyObject } from './middleware/model-adaptor.type'
import { OptionDataCollection, OptionDataParams } from './models/option-data.type'

export const useOptionData = <OptionValue extends AnyObject>(
  path: string | undefined,
  params?: OptionDataParams
) => {
  const { limit = 20, page = 1, ...otherParams } = params || {}

  const { data, ...results } = useSWR<OptionDataCollection<OptionValue>>(
    path
      ? {
          path,
          params: { limit, page, ...otherParams },
        }
      : null
  )

  return { ...data, ...results }
}

export const useOptionDataById = <OptionValue extends AnyObject>(
  path: string | undefined,
  identifier: string,
  isSelectedIdWithParams?: boolean,
  params?: OptionDataParams
) => {
  const { data, mutate, isLoading } = useSWR<OptionValue>(
    path
      ? isSelectedIdWithParams
        ? {
            path: `${path}`,
            params,
          }
        : {
            path: `${path}/${identifier}`,
          }
      : null,
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
