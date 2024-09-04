import { Currency } from './currency.type'
import { PriceInterval } from './price-interval.type'
import { PriceTax } from './price-tax.types'
import { PriceType } from './price-type.types'
import { PriceUnit } from './price-unit.types'

export type PriceConfig = {
  id: number
  priceValue: string
  priceUnit: PriceUnit
  priceInterval: PriceInterval
  priceType: PriceType
  priceCurrency: Currency
  priceTax: PriceTax
  createdAt: string
  updatedAt: string
}
