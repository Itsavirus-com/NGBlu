import { EnterpriseRootAddress } from './enterprise-root-address.type'
import { Namespace } from './namespace.type'
import { OrganizationUnit } from './organization-unit.type'
import { Project } from './project.type'

export type EnterpriseRootProject = {
  id: number
  projectId: number
  project: Project
  enterpriseRootAddressesId: number
  enterpriseRootAddresses: EnterpriseRootAddress
  ouUnitId: number
  ouUnit: OrganizationUnit
  enterpriseRootId: number
  created_at: string
  updated_at: string
  namespace: Namespace[]
}
