import { TreeData } from '../page.type'

export const generateItemType = (index: string | null): string => {
  if (!index) return ''

  return index?.replace(/-\d+(-\d+)?$/, '')
}

export const generateItemIcon = (index: string | null): string => {
  const itemType = generateItemType(index)

  switch (itemType) {
    case 'enterprise-root':
      return 'crown'
    case 'enterprise-root-address':
    case 'business-partner-address':
      return 'map'
    case 'enterprise-root-business-partner':
    case 'business-partner-business-partner':
      return 'office-bag'
    case 'enterprise-root-contact':
    case 'business-partner-contact':
      return 'messages'
    case 'enterprise-root-customer':
    case 'business-partner-customer':
      return 'profile-user'
    case 'enterprise-root-project':
    case 'business-partner-project':
      return 'chart-line'
    case 'enterprise-root-user':
    case 'business-partner-user':
      return 'security-user'
    default:
      return 'abstract-26'
  }
}

export const generateItemId = ({ index, data }: TreeData): string => {
  const itemType = generateItemType(index as string)

  switch (itemType) {
    case 'enterprise-root-address':
      return data?.address?.id
    case 'business-partner-address':
    case 'enterprise-root-contact':
      return data?.contactInfo?.id
    case 'business-partner-contact':
    case 'enterprise-root-customer':
      return data?.endclient?.id
    case 'business-partner-customer':
    case 'enterprise-root-project':
      return data?.project?.id
    case 'business-partner-project':
    case 'enterprise-root-user':
      return data.user?.id
    case 'business-partner-user':
    case 'enterprise-root':
    case 'enterprise-root-business-partner':
    case 'business-partner-business-partner':
      return data?.id
    default:
      return ''
  }
}

export const generateItemTitle = ({ index, data }: TreeData): string => {
  const itemType = generateItemType(index as string)

  switch (itemType) {
    case 'enterprise-root-address':
    case 'business-partner-address':
      return data?.address?.addressName
    case 'enterprise-root-contact':
    case 'business-partner-contact':
      return data?.person && `${data.person?.firstname} ${data.person?.lastname}`
    case 'enterprise-root-customer':
    case 'business-partner-customer':
      return data?.endclient?.name
    case 'enterprise-root-project':
    case 'business-partner-project':
      return data?.project?.projectName
    case 'enterprise-root-user':
    case 'business-partner-user':
      return data?.user?.displayName
    case 'enterprise-root':
    case 'enterprise-root-business-partner':
    case 'business-partner-business-partner':
    default:
      return data?.name
  }
}
