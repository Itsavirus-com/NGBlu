import { AddressType } from './address-type.type'
import { Address } from './address.type'

export type EnterpriseRootAddress = {
  id: number
  addressId: number
  address: Address
  addressTypeId: number
  address_type: AddressType
  ouUnitId: number
  enterpriseRootId: number
  createdAt: string
  updatedAt: string
}
