import { Country } from './country.type'
import { PriceUnit } from './price-unit.type'

export type PriceTax = {
  id: number
  name: string
  taxValue: string
  country: Country
  priceUnit: PriceUnit
  createdAt: string
  updatedAt: string
}
