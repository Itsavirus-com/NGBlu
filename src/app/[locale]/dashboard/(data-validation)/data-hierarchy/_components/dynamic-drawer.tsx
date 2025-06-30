import { useMemo } from 'react'

import { Drawer } from '@/components/drawer/Drawer'

import { AddressContent } from './address-content'
import { BusinessPartnerContent } from './business-partner-content'
import { ContactContent } from './contact-content'
import { CustomerContent } from './customer-content'
import { DrawerBreadcrumb } from './drawer-breadcrumb'
import { DynamicDrawerProps } from './dynamic-drawer.type'
import { EnterpriseRootContent } from './enterprise-root-content'
import { generateItemIcon, generateItemId, generateItemTitle, generateItemType } from './helper'
import { OrgUnitContent } from './org-unit-content'
import { ProjectContent } from './project-content'
import { UserContent } from './user-content'

export const DynamicDrawer = ({ item, onBreadcrumbPress }: DynamicDrawerProps) => {
  const itemType = useMemo(() => {
    if (!item) return ''

    return generateItemType(item?.index as string)
  }, [item?.index])

  const itemIcon = useMemo(() => {
    if (!item) return ''

    return generateItemIcon(item?.index as string)
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
        return <EnterpriseRootContent data={item?.data} />
      case 'address':
      case 'enterprise-root-address':
      case 'business-partner-address':
        return <AddressContent data={item?.data} />
      case 'business-partner':
      case 'enterprise-root-business-partner':
      case 'business-partner-business-partner':
        return <BusinessPartnerContent data={item?.data} />
      case 'contact':
      case 'enterprise-root-contact':
      case 'business-partner-contact':
        return <ContactContent data={item?.data} />
      case 'customer':
      case 'enterprise-root-customer':
      case 'business-partner-customer':
        return <CustomerContent data={item?.data} />
      case 'enterprise-root-project':
      case 'business-partner-project':
        return <ProjectContent data={item?.data} />
      case 'project':
      case 'enterprise-root-user':
      case 'business-partner-user':
        return <UserContent data={item?.data} />
      case 'organisational-unit':
      case 'enterprise-root-org-unit':
      case 'business-partner-org-unit':
        return <OrgUnitContent data={item?.data} />
      default:
        return null
    }
  }

  return (
    <Drawer id="enterprise_root" title={itemTitle} icon={itemIcon} dataId={itemId}>
      <DrawerBreadcrumb items={item?.data?.namespace} onBreadcrumbPress={onBreadcrumbPress} />

      {renderDrawerContent()}
    </Drawer>
  )
}
