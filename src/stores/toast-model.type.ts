export type ToastModel = {
  variant?: 'success' | 'danger' | 'warning' | 'info'
  title?: string
  body?: string
  visible?: boolean

  readonly displayTitle?: string
  readonly icon?: string
}
