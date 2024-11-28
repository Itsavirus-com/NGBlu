import { Address } from './address.type'
import { EndClient } from './end-client.type'
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
  enterpriseRootAddresses: Address
  createdAt: string
  updatedAt: string
  namespace: Namespace[]
}
