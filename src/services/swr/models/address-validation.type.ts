export interface KvkData {
  id: number
  provider: string
  similarityScore: number
  differences: {
    scores: {
      streetName: number
      houseNumber: number
      name: number
    }
    streetName: string
    houseNumber: number
    houseNumberSuffix: string
    postalCode: string
    city: string
    country: string
    addressId: number
    companyName: string
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

export type AddressValidationData = {
  data: KvkData[]
  currentPage: number
  lastPage: number
  totalData: number
  perPage: number
}
