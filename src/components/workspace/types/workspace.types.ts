export type WorkspaceType = 'ngblu'

export type WorkspaceInfo = {
  id: number
  name: string
  type: WorkspaceType
  companyUrl?: string
  phoneNumber?: string
  email?: string
  vatNumber?: string
  addressName?: string
  postalCode?: string
  cityName?: string
  countryName?: string
  brancheName?: string
}

export type WorkspaceActivity = {
  id: number
  type: 'order' | 'invoice' | 'quote'
  description: string
  date: string
  status: 'open' | 'closed' | 'pending'
  amount?: number
  currency?: string
}

export type WorkspaceEntity = {
  id: number
  name: string
  generalInformation?: string
  phoneNumber?: string
  address?: string
  additionalInfo?: Record<string, any>
}

export type WorkspaceQuote = {
  id: number
  amount?: number
  currency?: string
  closeDate: string
  stage: string
}

export type ManagementOption = {
  icon: string
  titleKey: string
  href: string
}

export type WorkspaceTab = {
  eventKey: string
  title: string
  content: React.ReactNode
  condition: boolean
}

export type EntityType = 'business-partner'

export type EntityConfig = {
  type: EntityType
  icon: string
  iconBg: string
  iconColor: string
  singularKey: string
  pluralKey: string
  createButtonKey: string
  showMoreHref: string
}
