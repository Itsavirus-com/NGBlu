import { Address } from '@/services/swr/models/address.types'

export type AddressProps = {
  title: string
  address: Address
  isLoading: boolean
}
