import { Currency } from './currency.type'
import { PriceInterval } from './price-interval.type'
import { PriceTax } from './price-tax.type'
import { PriceType } from './price-type.type'
import { PriceUnit } from './price-unit.type'

export type PriceConfig = {
  id: number
  priceValue: number
  priceUnitId: number
  priceUnit: PriceUnit
  priceIntervalId: number
  priceInterval: PriceInterval
  priceTypeId: number
  priceType: PriceType
  priceCurrencyId: number
  priceCurrency: Currency
  priceTaxId: number
  priceTax: PriceTax
  createdAt: string
  updatedAt: string
}
