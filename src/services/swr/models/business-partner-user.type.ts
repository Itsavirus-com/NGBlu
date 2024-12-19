import { Person } from './person.type'
import { User } from './user.type'

export type BusinessPartnerUser = {
  id: number
  userId: number
  user: User
  person: Person
  ouUnitId: number
  businesspartnerId: number
  createdAt: string
  updatedAt: string
}
