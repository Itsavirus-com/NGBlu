import { Address } from './address.types'

export type CompanyInfo = {
  id: number
  originId: number
  companyname: string
  companyStatusId: number
  companyStatus: any
  vatNumber: string
  chamberOfCommerceId: string
  legalAddressId: number
  legalAddress: Address
  visitAddressId: number
  visitAddress: Address
  postalAddressId: number
  postalAddress: Address
  invoiceAddressId: number
  invoiceAddress: Address
  createdAt: string
  updatedAt: string
}
