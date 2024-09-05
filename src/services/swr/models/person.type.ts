import { Gender } from './gender.type'
import { PersonType } from './person-type.type'

export type Person = {
  id: number
  firstname: string
  lastname: string
  nameSuffix: string
  namePrefix: string
  salutation: string
  titles: string
  genderId: number
  gender: Gender
  pronounce: string
  department: string
  role: string
  personTypeId: number
  personType: PersonType
  createdAt: string
  updatedAt: string
}
