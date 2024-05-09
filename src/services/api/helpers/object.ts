import camelCase from 'lodash/camelCase'
import snakeCase from 'lodash/snakeCase'

import { AnyObject, KeyConverter } from './object.types'

export const snakeCaseKeys: KeyConverter = data => {
  if (!data) return data

  if (Array.isArray(data)) return data.map((item: any) => camelizeKeys(item))

  if (typeof data === 'object') {
    const result: AnyObject = {}

    Object.entries(data).forEach(([key, value]) => {
      const camelizedKey = snakeCase(key)

      if (!value) return

      if (Array.isArray(value)) {
        result[camelizedKey] = value.map((item: any) => camelizeKeys(item))
        return
      }

      if (typeof value === 'object') {
        result[camelizedKey] = camelizeKeys(value)
        return
      }

      result[camelizedKey] = value
    })

    return result
  }

  return data
}

export const camelizeKeys: KeyConverter = data => {
  if (!data) return data

  if (Array.isArray(data)) return data.map((item: any) => camelizeKeys(item))

  if (typeof data === 'object') {
    const result: AnyObject = {}

    Object.entries(data).forEach(([key, value]) => {
      const camelizedKey = camelCase(key)

      if (!value) return

      if (Array.isArray(value)) {
        result[camelizedKey] = value.map((item: any) => camelizeKeys(item))
        return
      }

      if (typeof value === 'object') {
        result[camelizedKey] = camelizeKeys(value)
        return
      }

      result[camelizedKey] = value
    })

    return result
  }

  return data
}
