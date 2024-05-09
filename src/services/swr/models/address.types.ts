import { Collection } from '../middleware/collection-adaptor.type'

export type Address = {
  id: number
  addressName: string
  streetName: string
  postalCode: string
  houseNumber?: string
  houseNumberSuffix?: string
  appartmentNumber?: number
  area?: string
  city?: string
  county?: string
  lat: string
  lng: string
  googleAddressId?: string
  createdAt: string
  updatedAt: string
}

export type AddressCollection = Collection<'addresses', Address>
