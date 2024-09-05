import { Address } from './address.types'
import { CompanyInfo } from './company-info.type'
import { EndClientStatus } from './end-client-status.type'
import { EndClientType } from './end-client-type.type'

export type EndClient = {
  id: number
  name: string
  typeId: number
  endClientType: EndClientType
  statusId: number
  endClientStatus: EndClientStatus
  accountNumber: string
  referenceId: string
  afasId: string
  personId: number
  contactPersonId: number
  companyInfoId: number
  companyInfo: CompanyInfo
  locationAddressId: number
  locationAddress: Address
  createdAt: string
  updatedAt: string
}
