import { Person } from './person.type'

export type User = {
  id: number
  displayName: string
  firstname: string
  lastname: string
  email: string
  phoneNumber: string
  roles: string[]
  personId: number
  person: Person
  lastLogin: string
  blockedAt: string
  blocked: boolean
  createdAt: string
  updatedAt: string
}
