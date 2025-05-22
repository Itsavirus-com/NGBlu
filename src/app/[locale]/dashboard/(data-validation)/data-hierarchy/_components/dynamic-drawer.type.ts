import { TreeData } from '../page.type'

export type DynamicDrawerProps = {
  item: TreeData | null
  onBreadcrumbPress?: (item: TreeData) => void
}

export type ContentProps = {
  data: Record<string, any>
}
