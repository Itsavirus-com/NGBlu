import { Address } from './address.type'
import { CompanyStatus } from './company-status.type'

export type Company = {
  id: number
  originId: number
  origin: Record<string, unknown>
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
