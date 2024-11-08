import { Contact } from './contact.type'
import { OrganizationUnit } from './organization-unit.type'
import { PersonResponsibility } from './person-responsibility.type'
import { Person } from './person.type'

export type EnterpriseRootContact = {
  id: number
  personId: number
  person: Person
  responsibilityId: number
  responsibility: PersonResponsibility
  contactInfoId: number
  contactInfo: Contact
  ouUnitId: number
  ouUnit: OrganizationUnit
  enterpriseRootId: number
  createdAt: string
  updatedAt: string
}
