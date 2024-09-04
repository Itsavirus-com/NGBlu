import { PriceConfig } from './price-config.type'
import { Product } from './product.type'
import { Service } from './service.type'

export type PricePlan = {
  id: number
  name: string
  isDefault: boolean
  priceConfig: PriceConfig
  fallbackPriceConfig: PriceConfig
  product?: Product
  service?: Service
  createdAt: string
  updatedAt: string
}
