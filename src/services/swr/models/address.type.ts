import { Country } from './country.type'
import { Collection } from '../middleware/collection-adaptor.type'

export type Address = {
  id: number
  addressName: string
  streetname: string
  housenumber: string
  housenumberSuffix: string
  appartmentNumber: string
  area: string
  county: string
  city: string
  postalcode: string
  countryId: number
  country: Country
  lat: string
  lng: string
  googleAddressId: string
  createdAt: string
  updatedAt: string
}

export type AddressCollection = Collection<'addresses', Address>
