import { PriceConfig } from './price-config.type'
import { Product } from './product.type'
import { Service } from './service.type'

export type PricePlan = {
  id: number
  name: string
  isDefault: boolean
  priceConfigId: number
  priceConfig: PriceConfig
  fallbackPriceConfigId: number
  fallbackPriceConfig: PriceConfig
  productId: number
  product?: Product
  serviceId: number
  service?: Service
  createdAt: string
  updatedAt: string
}
