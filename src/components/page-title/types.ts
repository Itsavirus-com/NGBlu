export type BreadcrumbItem = {
  title: string
  path: string
  isSeparator?: boolean
  isActive?: boolean
}

export type PageTitleProps = {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
}
