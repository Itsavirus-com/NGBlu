import { Collection } from '../middleware/collection-adaptor.type'
import { AnyObject } from '../middleware/model-adaptor.type'

export type OptionDataParams = {
  page?: number
  limit?: number
} & Record<string, any>

export type OptionDataCollection<OptionValues extends AnyObject> = Collection<'data', OptionValues>
