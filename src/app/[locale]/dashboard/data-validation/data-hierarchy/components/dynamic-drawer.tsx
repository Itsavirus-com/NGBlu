import { useMemo } from 'react'

import { Drawer } from '@/components/drawer'

import { AddressContent } from './address-content'
import { BusinessPartnerContent } from './business-partner-content'
import { ContactContent } from './contact-content'
import { CustomerContent } from './customer-content'
import { DynamicDrawerProps } from './dynamic-drawer.type'
import { EnterpriseRootContent } from './enterprise-root-content'
import { generateItemIcon, generateItemId, generateItemTitle, generateItemType } from './helper'
import { ProjectContent } from './project-content'
import { UserContent } from './user-content'

export const DynamicDrawer = ({ item }: DynamicDrawerProps) => {
  const itemType = useMemo(() => {
    if (!item) return ''

    return generateItemType(item.index as string)
  }, [item?.index])

  const itemIcon = useMemo(() => {
    if (!item) return ''

    return generateItemIcon(item.index as string)
  }, [item?.index])

  const itemId = useMemo(() => {
    if (!item) return ''

    return generateItemId(item)
  }, [item?.index])

  const itemTitle = useMemo(() => {
    if (!item) return ''

    return generateItemTitle(item)
  }, [item?.index])

  const renderDrawerContent = () => {
    if (!itemType || !item) return null

    switch (itemType) {
      case 'enterprise-root':
        return <EnterpriseRootContent data={item.data} />
      case 'enterprise-root-address':
      case 'business-partner-address':
        return <AddressContent data={item.data} />
      case 'enterprise-root-business-partner':
      case 'business-partner-business-partner':
        return <BusinessPartnerContent data={item.data} />
      case 'enterprise-root-contact':
      case 'business-partner-contact':
        return <ContactContent data={item.data} />
      case 'enterprise-root-customer':
      case 'business-partner-customer':
        return <CustomerContent data={item.data} />
      case 'enterprise-root-project':
      case 'business-partner-project':
        return <ProjectContent data={item.data} />
      case 'enterprise-root-user':
      case 'business-partner-user':
        return <UserContent data={item.data} />
      default:
        return null
    }
  }

  return (
    <Drawer id="enterprise_root" title={itemTitle} icon={itemIcon} dataId={itemId}>
      {renderDrawerContent()}
    </Drawer>
  )
}
