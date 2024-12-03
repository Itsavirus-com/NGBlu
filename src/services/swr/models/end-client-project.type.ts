import { Address } from './address.type'
import { Project } from './project.type'

export type EndClientProject = {
  id: number
  projectId: number
  project: Project
  endclientAddressId: number
  endclientAddressesId: number
  endclientAddress: Address
  endclientId: number
  ouUnitId: number
  createdAt: string
  updatedAt: string
}
