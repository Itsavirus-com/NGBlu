import { EnterpriseRootAddress } from './enterprise-root-address.type'
import { Namespace } from './namespace.type'
import { OrganizationUnit } from './organization-unit.type'

export type EnterpriseRoot = {
  id: number
  name: string
  enterpriseRootAddressesId: number
  enterpriseRootAddresses: EnterpriseRootAddress
  ouUnitId: number
  ouUnit: OrganizationUnit
  addressesCount: number
  contactsCount: number
  usersCount: number
  projectsCount: number
  customersCount: number
  businessPartnersCount: number
  createdAt: string
  updatedAt: string
  namespace: Namespace
}
