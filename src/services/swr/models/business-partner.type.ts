import { BusinessPartnerType } from './business-partner-type.type'
import { Company } from './company.type'
import { Namespace } from './namespace.type'

export type Parent = {
  id: number
  name: string
  business_partner_addresses_count: number | null
  business_partner_contacts_count: number | null
  business_partner_customers_count: number | null
  business_partner_projects_count: number | null
  business_partner_users_count: number | null
  created_at: string
  updated_at: string
  namespace: Namespace[]
}

export type BusinessPartner = {
  id: number
  name: string
  companyInfoId: number
  companyInfo: Company
  businesspartnerTypeId: number
  businesspartnerType: BusinessPartnerType
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
  ouUnitId: number
  parent: Parent
}
