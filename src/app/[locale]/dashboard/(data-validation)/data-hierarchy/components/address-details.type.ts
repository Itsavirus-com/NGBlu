export type AddressDetailsProps = {
  address: {
    addressName: string
    streetname: string
    housenumber: string
    housenumberSuffix: string
    appartmentNumber: string
    area: string
    county: string
    city: string
    country: {
      name: string
      iso: string
      locale: string
      currency: string
      decimalSymbol: string
    }
    postalcode: string
  }
  addressType?: {
    id: number
    addressType: string
  }
}
