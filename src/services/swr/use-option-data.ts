import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { AnyObject } from './middleware/model-adaptor.type'
import { OptionDataCollection, OptionDataParams } from './models/option-data.type'

export const useOptionData = <OptionValue extends AnyObject>(
  path: string,
  params?: OptionDataParams
) => {
  const { limit = 20, page = 1, ...otherParams } = params || {}

  const { data, ...results } = useSWR<OptionDataCollection<OptionValue>>({
    path,
    params: { limit, page, ...otherParams },
  })

  return { ...data, ...results }
}

export const useOptionDataById = <OptionValue extends AnyObject>(
  path: string,
  identifier: string,
  isSelectedIdWithParams?: boolean,
  params?: OptionDataParams
) => {
  const { data, mutate, isLoading } = useSWR<OptionValue>(
    () =>
      isSelectedIdWithParams
        ? {
            path: `${path}`,
            params: { id: identifier },
          }
        : {
            path: `${path}/${identifier}`,
          },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}
