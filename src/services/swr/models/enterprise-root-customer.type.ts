import { EndClient } from './end-client.type'
import { EnterpriseRootAddress } from './enterprise-root-address.type'
import { Namespace } from './namespace.type'
import { OrganizationUnit } from './organization-unit.type'

export type EnterpriseRootCustomer = {
  id: number
  parentId: number
  ouUnitId: number
  ouUnit: OrganizationUnit
  endclientId: number
  endclient: EndClient
  enterpriseRootId: number
  enterpriseRootAddressesId: number
  enterpriseRootAddresses: EnterpriseRootAddress
  createdAt: string
  updatedAt: string
  namespace: Namespace[]
}
