import { Address } from './address.type'
import { Namespace } from './namespace.type'

export type OrganizationUnit = {
  id: number
  name: string
  primaryAddressId: number
  primaryAddress: Address
  endclientId: number
  businesspartnerId: number
  enterpriseRootId: number
  createdAt: string
  updatedAt: string
  namespace: Namespace[]
  inputType: string
}
