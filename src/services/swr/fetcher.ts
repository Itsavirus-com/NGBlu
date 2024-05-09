import { swrApi } from '@/services/api'

import { FetcherParams } from './helpers/swr.type'

export const fetcher = async (args: FetcherParams) => {
  const path = [args.path, args.id].filter(Boolean).join('/')

  try {
    const result = await swrApi.fetch(path, args.params)

    if (result.ok) {
      return result.data
    }
  } catch (error) {
    throw error
  }
}
