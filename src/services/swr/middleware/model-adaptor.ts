import { SWRHook } from 'swr'
import { proxy, snapshot } from 'valtio'

import { ModelAdaptor } from './model-adaptor.type'

export const modelAdaptor: ModelAdaptor = (computeFn, dataPrefix = '') => {
  return (useSWRNext: SWRHook) => {
    return (key, fetcher, config) => {
      const swr: any = useSWRNext(key, fetcher, config)
      const rawData = dataPrefix ? swr.data?.[dataPrefix] : swr.data

      if (computeFn && rawData && typeof rawData === 'object') {
        const state = proxy<any>(rawData)
        const computed = computeFn(state)

        // Check if the original data is an array to preserve its structure
        const data = Array.isArray(rawData)
          ? [...snapshot(state)] // Preserve array structure
          : { ...snapshot(state), ...snapshot(computed) } // Object spread for objects

        return Object.assign({}, swr, { data })
      }

      return swr
    }
  }
}
