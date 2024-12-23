export type BreadcrumbItem<T = unknown> = {
  name: string
  path: string
  type: string
  data?: T // Optional additional data specific to each breadcrumb item
}

export type BreadcrumbProps<T = unknown> = {
  items: BreadcrumbItem<T> | BreadcrumbItem<T>[] // Single item or array of items
  onBreadcrumbPress?: (item: BreadcrumbItem<T>) => void
}
