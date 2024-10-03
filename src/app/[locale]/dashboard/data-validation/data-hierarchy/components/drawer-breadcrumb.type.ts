import { TreeData } from '../page.type'

export type DrawerBreadcrumbItem = {
  name: string
  path: string
  type: string
}

export type DrawerBreadcrumbProps = {
  items: DrawerBreadcrumbItem | DrawerBreadcrumbItem[]
  onBreadcrumbPress?: (item: TreeData) => void
}
