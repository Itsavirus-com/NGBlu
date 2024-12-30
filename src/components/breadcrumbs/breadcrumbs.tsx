import { Breadcrumb } from 'react-bootstrap'

import { generateItemIcon } from '@/app/[locale]/dashboard/(data-validation)/data-hierarchy/components/helper'
import { useRouter } from '@/navigation'

import { BreadcrumbItem, BreadcrumbProps } from './breadcrumbs.type'
import { mapApiPathToAppRoute } from './helper'
import { KTIcon } from '../kt-icon/kt-icon'

export const Breadcrumbs = <T,>({ items, onBreadcrumbPress }: BreadcrumbProps<T>) => {
  const { push } = useRouter()
  if (!items || !Array.isArray(items)) return null

  const handleBreadcrumbClick = (index: number, item: BreadcrumbItem<T>) => {
    if (index !== items.length - 1) {
      onBreadcrumbPress?.(item)
      // handle redirect to App Route
      const appRoute = mapApiPathToAppRoute(item.path)
      push(`/${appRoute}`)
    }
  }

  return (
    <Breadcrumb className="mb-7">
      {items.map((item, index) => (
        <Breadcrumb.Item
          as="li"
          key={index}
          onClick={() => handleBreadcrumbClick(index, item)}
          active={index === items.length - 1}
        >
          <KTIcon iconName={generateItemIcon(item.type)} className="me-1" />

          {item.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}
