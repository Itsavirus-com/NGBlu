import { Country } from './country.type'
import { PriceType } from './price-type.type'

export type PriceTax = {
  id: number
  name: string
  taxValue: number
  countryId: number
  country: Country
  priceTypeId: number
  priceType: PriceType
  createdAt: string
  updatedAt: string
}
