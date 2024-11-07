import { Address } from './address.type'

export type EndClientAddress = {
  id: number
  endclientId: number
  addressId: number
  address: Address
  isPrimaryAddress: number
  isPrimaryLocation: boolean
  created_at: string
  updated_at: string
}
