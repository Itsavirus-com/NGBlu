export type PersonDetailsProps = {
  person: {
    firstname: string
    lastname: string
    nameSuffix: string
    namePrefix: string
    titles: string
    gender: {
      id: number
      gender: string
    }
    department: string
    personType: {
      id: number
      type: string
    }
  }
}
