import { Person } from './person.type'

export type BusinessPartnerContact = {
  id: number
  personId: number
  person: Person
  contactInfoId: number
  responsibilityId: number
  businesspartnerId: number
  enterpriseRootId: number
  createdAt: string
  updatedAt: string
}
