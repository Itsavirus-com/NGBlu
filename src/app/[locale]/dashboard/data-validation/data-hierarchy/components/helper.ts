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
    case 'address':
    case 'enterprise-root-address':
    case 'business-partner-address':
      return 'map'
    case 'business-partner':
    case 'enterprise-root-business-partner':
    case 'business-partner-business-partner':
      return 'office-bag'
    case 'contact':
    case 'enterprise-root-contact':
    case 'business-partner-contact':
      return 'messages'
    case 'customer':
    case 'enterprise-root-customer':
    case 'business-partner-customer':
      return 'profile-user'
    case 'project':
    case 'enterprise-root-project':
    case 'business-partner-project':
      return 'chart-line'
    case 'user':
    case 'enterprise-root-user':
    case 'business-partner-user':
      return 'security-user'
    case 'organisational-unit':
    case 'enterprise-root-org-unit':
    case 'business-partner-org-unit':
      return 'share'
    default:
      return 'abstract-26'
  }
}

export const generateItemId = ({ index, data }: TreeData): string => {
  const itemType = generateItemType(index as string)

  switch (itemType) {
    case 'address':
    case 'enterprise-root-address':
    case 'business-partner-address':
      return data?.address?.id
    case 'contact':
    case 'enterprise-root-contact':
    case 'business-partner-contact':
      return data?.id
    case 'customer':
    case 'enterprise-root-customer':
    case 'business-partner-customer':
      return data?.endclient?.id
    case 'project':
    case 'enterprise-root-project':
    case 'business-partner-project':
      return data?.project?.id
    case 'user':
    case 'enterprise-root-user':
    case 'business-partner-user':
      return data.user?.id
    case 'organisational-unit':
    case 'enterprise-root-org-unit':
    case 'business-partner-org-unit':
      return data?.id
    case 'enterprise-root':
    case 'business-partner':
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
    case 'address':
    case 'enterprise-root-address':
    case 'business-partner-address':
      return data?.address?.addressName
    case 'contact':
    case 'enterprise-root-contact':
    case 'business-partner-contact':
      return data?.person && `${data.person?.firstname} ${data.person?.lastname}`
    case 'customer':
    case 'enterprise-root-customer':
    case 'business-partner-customer':
      return data?.endclient?.name
    case 'project':
    case 'enterprise-root-project':
    case 'business-partner-project':
      return data?.project?.projectName
    case 'user':
    case 'enterprise-root-user':
    case 'business-partner-user':
      return data?.user?.displayName
    case 'organisational-unit':
    case 'enterprise-root-org-unit':
    case 'business-partner-org-unit':
      return data?.name
    case 'enterprise-root':
    case 'business-partner':
    case 'enterprise-root-business-partner':
    case 'business-partner-business-partner':
    default:
      return data?.name
  }
}
