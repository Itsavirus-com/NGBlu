import { AddressType } from './address-type.type'
import { Address } from './address.type'
import { Namespace } from './namespace.type'
import { OrganizationUnit } from './organization-unit.type'

export type EnterpriseRootAddress = {
  id: number
  addressId: number
  address: Address
  addressTypeId: number
  addressType: AddressType
  ouUnitId: number
  enterpriseRootId: number
  createdAt: string
  updatedAt: string
}

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
