import { useMemo } from 'react'

import { Drawer } from '@/components/drawer'

import { AddressContent } from './address-content'
import { DynamicDrawerProps } from './dynamic-drawer.type'
import { EnterpriseRootContent } from './enterprise-root-content'

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
