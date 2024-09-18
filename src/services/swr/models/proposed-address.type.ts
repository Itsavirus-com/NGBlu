import { Collection } from '../middleware/collection-adaptor.type'

export type ProposedAddress = {
  id: number
  differences: {
    streetname: {
      value: string
      confirmationLevel: string
    }
    housenumber: {
      value: string
      confirmationLevel: string
    }
    postalcode: {
      value: string
      confirmationLevel: string
    }
    city: {
      value: string
      confirmationLevel: string
    }
    country: {
      value: string
      confirmationLevel: string
    }
    geocode: {
      location: {
        latitude: number
        longitude: number
      }
      plusCode: {
        globalCode: string
      }
      bounds: {
        low: {
          latitude: number
          longitude: number
        }
        high: {
          latitude: number
          longitude: number
        }
      }
      featureSizeMeters: number
      placeId: string
      placeTypes: string[]
    }
  }
  similarityScore: number
  addressId: number
  validatedBy: string
  validatedAt: string
  provider: string
  referenceId: number
  referenceType: string
  createdAt: string
  updatedAt: string
}

export type ProposedAddressCollection = Collection<'addresses', ProposedAddress>
