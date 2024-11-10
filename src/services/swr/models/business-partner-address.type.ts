import { AddressType } from './address-type.type'
import { Address } from './address.type'

export type BusinessPartnerAddress = {
  id: number
  businesspartnerId: number
  address: Address
  addressType: AddressType
  created_at: string
  updated_at: string
}
