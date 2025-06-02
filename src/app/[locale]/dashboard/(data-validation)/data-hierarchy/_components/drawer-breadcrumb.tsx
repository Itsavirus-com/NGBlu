import { Breadcrumb } from 'react-bootstrap'

import { KTIcon } from '@/components/kt-icon/KtIcon'
import { enterpriseRootApi } from '@/services/api/enterprise-root-api'

import { DrawerBreadcrumbItem, DrawerBreadcrumbProps } from './drawer-breadcrumb.type'
import { generateItemIcon } from './helper'

export const DrawerBreadcrumb = ({ items, onBreadcrumbPress }: DrawerBreadcrumbProps) => {
  if (!items || !Array.isArray(items)) return null

  const handleBreadcrumbPress = async (item: DrawerBreadcrumbItem) => {
    const res = await enterpriseRootApi.getItemDetails(item.path)

    if (res.ok) {
      onBreadcrumbPress?.({ index: item.type, ...res.data })
    }
  }

  return (
    <Breadcrumb className="mb-7">
      {items.map((item, index) => (
        <Breadcrumb.Item
          as="li"
          key={index}
          onClick={() => handleBreadcrumbPress(item)}
          active={index === items.length - 1}
        >
          <KTIcon iconName={generateItemIcon(item.type)} className="me-1" />

          {item.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}
