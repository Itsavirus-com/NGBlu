import * as Sentry from '@sentry/nextjs'

import { swrApi } from '@/services/api'

import { FetcherParams } from './helpers/swr.type'

export const fetcher = async (args: FetcherParams) => {
  const path = [args.path, args.id].filter(Boolean).join('/')

  try {
    const result = await swrApi.fetch(path, args.params)

    if (result.ok) {
      return result.data
    } else {
      // Log non-OK responses to Sentry
      Sentry.captureMessage('SWR fetch failed with non-OK response', {
        level: 'error',
        extra: {
          path,
          params: args.params,
          status: result.status,
          problem: result.problem,
        },
      })
    }
  } catch (error) {
    // Log exceptions to Sentry
    Sentry.captureException(error, {
      extra: {
        path,
        params: args.params,
      },
    })
    throw error
  }
}
