import { Person } from './person.type'

export type User = {
  id: number
  displayName: string
  email: string
  personId: number
  person: Person
  lastLogin: string
  blockedAt: string
  createdAt: string
  updatedAt: string
}
