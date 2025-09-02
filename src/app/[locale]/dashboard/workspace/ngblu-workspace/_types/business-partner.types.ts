export type BusinessPartnerInfo = {
  id: number
  name: string
  companyUrl?: string
  phoneNumber?: string
  email?: string
  vatNumber?: string
  addressName?: string
  postalCode?: string
  cityName?: string
  countryName?: string
  brancheName?: string
}

export type BusinessPartnerActivity = {
  id: number
  type: 'order' | 'invoice' | 'quote'
  description: string
  date: string
  status: 'open' | 'closed' | 'pending'
  amount?: number
  currency?: string
}

export type BusinessPartnerSite = {
  id: number
  name: string
  generalInformation: string
  phoneNumber: string
  address: string
}

export type BusinessPartnerQuote = {
  id: number
  amount: number
  currency: string
  closeDate: string
  stage: string
}

export type BusinessPartnerTableData = {
  id: number
  customerName: string
  email: string
  createdDate: string
  phoneNumber: string
  kvkNr: string
  ngAddress: string
  vatNr: string
}
