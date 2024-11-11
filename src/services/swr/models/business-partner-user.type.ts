import { User } from './user.type'

export type BusinessPartnerUser = {
  id: number
  userId: number
  user: User
  personId: number
  ouUnitId: number
  businesspartnerId: number
  createdAt: string
  updatedAt: string
}
