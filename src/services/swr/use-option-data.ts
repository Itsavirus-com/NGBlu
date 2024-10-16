import useSWR from 'swr'

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
