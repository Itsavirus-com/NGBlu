import { Address } from './address.type'
import { ProjectInfo } from './project-info.type'
import { ProjectType } from './project-type'

export type Project = {
  id: number
  projectName: string
  projectTypeId: number
  projectType: ProjectType
  projectInfoId: number
  projectInfo: ProjectInfo
  addressId: number
  address: Address
  ouUnitId: number
  endclientId: number
  businesspartnersId: number
  enterpriseRootId: number
  createdAd: string
  updatedAd: string
  inputType: string
}
