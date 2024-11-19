import { AddressType } from './address-type.type'
import { Address } from './address.type'

export type EnterpriseRootAddress = {
  id: number
  addressId: number
  addressName: string
  address: Address
  addressTypeId: number
  addressType: AddressType
  ouUnitId: number
  enterpriseRootId: number
  createdAt: string
  updatedAt: string
}
