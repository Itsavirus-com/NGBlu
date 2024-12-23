export type ConfirmationModalProps = {
  title: string
  body: string
  visible?: boolean
  onCancel: () => void
  onConfirm: () => void
  cancelLabel?: string
  confirmLabel?: string
  variant?: 'success' | 'danger' | 'warning' | 'info'
  isLoading?: boolean
}
