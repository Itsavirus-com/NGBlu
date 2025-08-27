export interface KvkCompanyData {
  kvkNumber: string
  tradeNames: string[]
  legalAddress: {
    streetName: string
    houseNumber: string
    houseNumberSuffix?: string
    postalCode: string
    city: string
    country: string
  }
  postalAddress?: any
  sbiCodes?: string[]
  // Add other fields as needed
}

export interface KvkResponse {
  success: boolean
  message: string | null
  data: KvkCompanyData
}
