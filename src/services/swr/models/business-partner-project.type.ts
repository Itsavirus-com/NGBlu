import { Namespace } from './namespace.type'
import { Project } from './project.type'

export type BusinessPartnerProject = {
  id: number
  projectId: number
  project: Project
  ouUnitId: number
  businesspartnerId: number
  businesspartnerAddressId: number
  businesspartnersAddressesId: number
  createdAt: string
  updatedAt: string
  namespace: Namespace[]
}
