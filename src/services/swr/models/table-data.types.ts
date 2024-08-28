import { Collection } from '../middleware/collection-adaptor.type'
import { AnyObject } from '../middleware/model-adaptor.type'

export type TableDataParams = {
  page?: number
  limit?: number
} & Record<string, any>

export type TableDataCollection<TableValues extends AnyObject> = Collection<'data', TableValues>
