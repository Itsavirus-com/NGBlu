import { BusinessPartnerType } from './business-partner-type.type'
import { Company } from './company.type'
import { Namespace } from './namespace.type'

export type BusinessPartner = {
  id: number
  name: string
  companyInfoId: number
  companyInfo: Company
  businesspartnerTypeId: number
  businessPartnerType: BusinessPartnerType
  businesspartnersAddressesId: number
  businessPartnerAddressesCount: number
  businessPartnerContactsCount: number
  businessPartnerCustomersCount: number
  businessPartnerProjectsCount: number
  businessPartnerUsersCount: number
  enterpriseRootId: number
  createdAt: string
  updatedAt: string
  namespace: Namespace
}
