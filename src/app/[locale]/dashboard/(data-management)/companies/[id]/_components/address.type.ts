import { Address } from '@/services/swr/models/address.type'

export type AddressProps = {
  title?: string
  address: Address
  isLoading: boolean
}
