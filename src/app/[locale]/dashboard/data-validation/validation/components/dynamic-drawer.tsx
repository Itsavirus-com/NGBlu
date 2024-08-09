import { useMemo } from 'react'

import { Drawer } from '@/components/drawer'

import { AddressContent } from './address-content'
import { BusinessPartnerContent } from './business-partner-content'
import { ContactContent } from './contact-content'
import { CustomerContent } from './customer-content'
import { DynamicDrawerProps } from './dynamic-drawer.type'
import { EnterpriseRootContent } from './enterprise-root-content'
import { ProjectContent } from './project-content'

export const DynamicDrawer = ({ index, title, item }: DynamicDrawerProps) => {
  const itemType = useMemo(() => index?.replace(/-\d+(-\d+)?$/, ''), [index])

  const renderDrawerContent = () => {
    if (!itemType || !item) return null

    switch (itemType) {
      case 'enterprise-root':
        return <EnterpriseRootContent data={item} />
      case 'enterprise-root-address':
      case 'business-partner-address':
        return <AddressContent data={item} />
      case 'enterprise-root-business-partner':
      case 'business-partner-business-partner':
        return <BusinessPartnerContent data={item} />
      case 'enterprise-root-contact':
      case 'business-partner-contact':
        return <ContactContent data={item} />
      case 'enterprise-root-customer':
      case 'business-partner-customer':
        return <CustomerContent data={item} />
      case 'enterprise-root-project':
      case 'business-partner-project':
        return <ProjectContent data={item} />
      default:
        return null
    }
  }

  return (
    <Drawer id="enterprise_root" title={title || ''}>
      {renderDrawerContent()}
    </Drawer>
  )
}
