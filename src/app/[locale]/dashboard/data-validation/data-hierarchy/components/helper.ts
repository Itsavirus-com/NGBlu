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
