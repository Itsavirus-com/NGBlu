import { Contact } from './contact.type'
import { PersonResponsibility } from './person-responsibility.type'

export type EndClientContact = {
  id: number
  personId: number
  responsibilityId: number
  responsibility: PersonResponsibility
  contactInfoId: number
  contactInfo: Contact
  endclientId: number
  enterpriseRootId: number
  createdAt: string
  updatedAt: string
}
