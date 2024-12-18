export type ContactType = {
  id: number
  parentId: number
  contactType: string
  createdAt: string
  updatedAt: string
}

export type ContactTypeResponse = {
  id: number
  parentId: number
  parent: ContactType
  contactType: string
  createdAt: string
  updatedAt: string
}
