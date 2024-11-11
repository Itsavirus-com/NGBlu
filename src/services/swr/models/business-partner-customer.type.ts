import { EndClient } from './end-client.type'
import { Namespace } from './namespace.type'

export type BusinessPartnerCustomer = {
  id: number
  ouUnitId: number
  endclientId: number
  endclient: EndClient
  businesspartnerId: number
  businesspartnerAddressId: number
  businesspartnersAddressesId: number
  enterpriseRootId: number
  createdAt: string
  updatedAt: string
  namespace: Namespace[]
}
