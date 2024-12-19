import { Address } from './address.type'
import { CompanyStatus } from './company-status.type'

export type Origin = {
  id: number
  originId: number
  companyName: string
  companyStatusId: number
  companyStatus: string | null
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

export type Company = {
  id: number
  originId: number
  origin: Origin
  companyname: string
  vatNumber: string
  companyStatusId: number
  companyStatus: CompanyStatus
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
