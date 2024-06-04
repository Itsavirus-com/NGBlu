// @ts-nocheck

import snakeCase from 'lodash/snakeCase'

import { Config } from './serialize-formdata.types'

const isUndefined = (value: any) => {
  return value === undefined
}

const isNull = (value: any) => {
  return value === null
}

const isBoolean = (value: any) => {
  return typeof value === 'boolean'
}

const isObject = (value: any) => {
  return value === Object(value)
}

const isArray = (value: any) => {
  return Array.isArray(value)
}

const isDate = (value: any) => {
  return value instanceof Date
}

const isBlob = (value: any, isReactNative: boolean) => {
  return isReactNative
    ? isObject(value) && !isUndefined(value.uri)
    : isObject(value) &&
        typeof value.size === 'number' &&
        typeof value.type === 'string' &&
        typeof value.slice === 'function'
}

function isFile(value: any, isReactNative: boolean) {
  return (
    isBlob(value, isReactNative) &&
    typeof value.name === 'string' &&
    (isObject(value.lastModifiedDate) || typeof value.lastModified === 'number')
  )
}

export const serialize = (obj: any, cfg: Config = {}, fd?: FormData, pre?: string) => {
  fd = fd || new FormData()

  const isReactNative = typeof fd.getParts === 'function'

  if (isUndefined(obj)) {
    return fd
  } else if (isNull(obj)) {
    if (!cfg.nullsAsUndefined) {
      fd.append(pre, '')
    }
  } else if (isBoolean(obj)) {
    if (cfg.booleansAsIntegers) {
      fd.append(pre, obj ? 1 : 0)
    } else {
      fd.append(pre, obj)
    }
  } else if (isArray(obj)) {
    if (obj.length) {
      obj.forEach((value: any, index: number) => {
        let key = pre + '[' + (cfg.indices ? index : '') + ']'

        if (cfg.noFilesWithArrayNotation && isFile(value, isReactNative)) {
          key = pre
        }

        serialize(value, cfg, fd, key)
      })
    } else if (cfg.allowEmptyArrays) {
      fd.append(pre + '[]', '')
    }
  } else if (isDate(obj)) {
    fd.append(pre, obj.toISOString())
  } else if (isObject(obj) && !isBlob(obj, isReactNative)) {
    Object.keys(obj).forEach(prop => {
      const value = obj[prop]

      if (isArray(value)) {
        while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
          prop = prop.substring(0, prop.length - 2)
        }
      }

      const snakedProp = cfg.useSnakedKey ? snakeCase(prop) : prop
      const key = pre
        ? cfg.dotsForObjectNotation
          ? pre + '.' + snakedProp
          : pre + '[' + snakedProp + ']'
        : snakedProp

      serialize(value, cfg, fd, key)
    })
  } else {
    fd.append(pre, obj)
  }

  return fd
}
