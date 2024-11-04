import { Address } from './address.type'

export type PersonAddress = {
  id: number
  personId: number
  addressId: number
  address: Address
  isPrimaryAddress: number
  isPrimaryLocation: boolean
  createdAt: string
  updatedAt: string
}
