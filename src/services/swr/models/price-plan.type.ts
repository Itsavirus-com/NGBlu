import { PriceConfig } from './price-config.type'

export type PricePlan = {
  id: number
  name: string
  isDefault: boolean
  priceConfig: PriceConfig
  fallbackPriceConfig: PriceConfig
  createdAt: string
  updatedAt: string
}
