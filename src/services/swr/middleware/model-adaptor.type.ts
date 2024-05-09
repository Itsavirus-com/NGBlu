import { Middleware } from 'swr'

export type AnyObject = Record<string, any>

export type ModelAdaptor = <Model extends AnyObject>(
  computeFn?: (state: Model) => Model & any,
  dataPrefix?: string
) => Middleware
