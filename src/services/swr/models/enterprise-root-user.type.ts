import { OrganizationUnit } from './organization-unit.type'
import { Person } from './person.type'
import { User } from './user.type'

export type EnterpriseRootUser = {
  id: number
  userId: number
  user: User
  personId: number
  person: Person
  ouUnitId: number
  ouUnit: OrganizationUnit
  enterpriseRootId: number
  createdAt: string
  updatedAt: string
}
