export type PageTitleProps = {
  title: string
  description?: string
  breadcrumbs?: {
    title: string
    path: string
    isSeparator?: boolean
    isActive?: boolean
  }[]
}
