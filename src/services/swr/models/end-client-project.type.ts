import { EndClientAddress } from './end-client-address.type'
import { Project } from './project.type'

export type EndClientProject = {
  id: number
  projectId: number
  project: Project
  endclientAddressId: number
  endclientAddressesId: number
  endclientAddress: EndClientAddress
  endclientId: number
  ouUnitId: number
  createdAt: string
  updatedAt: string
}
