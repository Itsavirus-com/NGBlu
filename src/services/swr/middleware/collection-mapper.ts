import get from 'lodash/get'

import { AnyObject } from './model-adaptor.type'

/**
 * The keys in this object are the keys that the app expects.
 * The values are the keys that the API returns.
 */
const defaultKeyMapping: Record<string, string> = {
  data: 'data.datas',
  currentPage: 'data.page',
  totalPages: 'data.totalPages',
  totalData: 'data.totalDatas',
}

/**
 * Maps the data from the API to the format that the app expects.
 * It also allows to map the data to a different collection name.
 */
export const mapData = (
  data: AnyObject,
  collectionName: string,
  keyMapping: Record<string, any> = {}
): AnyObject => {
  const result: AnyObject = {}

  Object.entries({ ...defaultKeyMapping, ...keyMapping }).forEach(([localKey, apiKey]) => {
    if (collectionName && localKey === 'data') {
      result[collectionName] = get(data, apiKey)
      return
    }

    result[localKey] = get(data, apiKey)
  })

  return result
}
