import { AddressType } from './address-type.type'
import { Address } from './address.type'

export type BusinessPartnerAddress = {
  id: number
  businesspartnerId: number
  addressId: number
  address: Address
  addressTypeId: number
  addressType: AddressType
  ouUnitId: number
  created_at: string
  updated_at: string
}
