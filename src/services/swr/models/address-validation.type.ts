export interface AddressComponent {
  value: string
  confirmationLevel: 'CONFIRMED' | 'UNCONFIRMED_BUT_PLAUSIBLE' | 'UNCONFIRMED'
}

export interface GeoLocation {
  latitude: number
  longitude: number
}

export interface GeocodeData {
  location: GeoLocation
  plusCode?: {
    globalCode: string
  }
  bounds?: {
    low: GeoLocation
    high: GeoLocation
  }
  placeId?: string
  placeTypes?: string[]
}

export interface GoogleData {
  id: number
  provider: string
  similarityScore: number
  differences: {
    streetname?: AddressComponent
    housenumber?: AddressComponent
    housenumberSuffix?: AddressComponent
    postalcode?: AddressComponent
    city?: AddressComponent
    country?: AddressComponent
    geocode?: GeocodeData
  }
  address: {
    id: number
    addressName: string | null
    streetname: string
    housenumber: string
    housenumberSuffix: string | null
    appartmentNumber: string | null
    area: string | null
    county: string | null
    city: string
    postalcode: string
    countryId: number
    country: {
      id: number
      name: string
      iso: string
      locale: string
      currency: string
      decimalSymbol: string
    }
    lat: string
    lng: string
    googleAddressId: string | null
    createdAt: string
    updatedAt: string
  }
  reference: any | null
  validatedBy: string
  validatedAt: string
  createdAt: string
  updatedAt: string
}

export interface KvkData {
  id: number
  provider: string
  similarityScore: number
  differences: {
    companyname?: {
      value: string
      similarityScore: number
    }
    streetname?: {
      value: string
      similarityScore: number
    }
    housenumber?: {
      value: number
      similarityScore: number
    }
    housenumberSuffix?: {
      value: string
      similarityScore: number
    }
    postalcode?: {
      value: string
      similarityScore: number
    }
    city?: {
      value: string
      similarityScore: number
    }
    country?: {
      value: string
      similarityScore: number
    }
  }
  address: {
    id: number
    addressName: string | null
    streetname: string
    housenumber: string
    housenumberSuffix: string | null
    appartmentNumber: string | null
    area: string | null
    county: string | null
    city: string
    postalcode: string
    countryId: number
    country: {
      id: number
      name: string
      iso: string
      locale: string
      currency: string
      decimalSymbol: string
    }
    lat: string
    lng: string
    googleAddressId: string | null
    createdAt: string
    updatedAt: string
  }
  reference: {
    id: number
    name: string
    parentId: number | null
    enterpriseRootId: number
    businesspartnerTypeId: number
    companyInfoId: number
    companyInfo: {
      id: number
      originId: string | null
      companyname: string
      companyStatusId: number
      vatNumber: string | null
      chamberOfCommerceId: string
      legalAddressId: number
      visitAddressId: number
      postalAddressId: number
      invoiceAddressId: number
      sbiCodes: string | null
      createdAt: string
      updatedAt: string
    }
    ouUnitId: number
    businesspartnersAddressesId: number
    businessPartnerAddressesCount: number | null
    businessPartnerContactsCount: number | null
    businessPartnerCustomersCount: number | null
    businessPartnerProjectsCount: number | null
    businessPartnerUsersCount: number | null
    createdAt: string
    updatedAt: string
  }
  validatedBy: string
  validatedAt: string
  createdAt: string
  updatedAt: string
}

export type AddressValidationData<T = KvkData | GoogleData> = {
  data: T[]
  currentPage: number
  lastPage: number
  totalData: number
  perPage: number
}
