import { Middleware } from 'swr'

import { AnyObject } from './model-adaptor.type'

export type Pagination = {
  perPage: number
  currentPage: number
  lastPage: number
  total: number
}

export type Collection<K extends string, T extends AnyObject> = {
  [key in K]: T[]
} & {
  pagination?: Pagination
  meta?: Pagination
}

type CollectionAdaptorParams<Model> = {
  computeFn?: (state: Model) => Model & any
  collectionName?: string
  keyMapping?: Record<string, any>
}

export type CollectionAdaptor = <Model extends AnyObject>(
  params: CollectionAdaptorParams<Model>
) => Middleware
