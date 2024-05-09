import { Middleware } from 'swr'

import { AnyObject } from './model-adaptor.type'

export type Collection<K extends string, T extends AnyObject> = {
  [key in K]: T[]
} & {
  currentPage: number
  totalPages: number
  totalData: number
}

type CollectionAdaptorParams<Model> = {
  computeFn?: (state: Model) => Model & any
  collectionName?: string
  keyMapping?: Record<string, any>
}

export type CollectionAdaptor = <Model extends AnyObject>(
  params: CollectionAdaptorParams<Model>
) => Middleware
