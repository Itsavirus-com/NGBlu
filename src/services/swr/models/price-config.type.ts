import { Currency } from './currency.type'
import { PriceInterval } from './price-interval.type'
import { PriceTax } from './price-tax.type'
import { PriceType } from './price-type.type'
import { PriceUnit } from './price-unit.type'

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
