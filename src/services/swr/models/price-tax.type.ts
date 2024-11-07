import { Country } from './country.type'
import { PriceUnit } from './price-unit.type'

export type PriceTax = {
  id: number
  name: string
  taxValue: number
  countryId: number
  country: Country
  priceUnitId: number
  priceUnit: PriceUnit
  createdAt: string
  updatedAt: string
}
