import { ContactType } from './contact-type.type'
import { Person } from './person.type'

export type Contact = {
  id: number
  contactInfo: string
  contactTypeId: number
  contactType: ContactType
  personId: number
  person: Person
  ouUnitId: number
  endclientId: number
  businesspartnerId: number
  enterpriseRootId: number
  createdAt: string
  updatedAt: string
}
