import { useTranslations } from 'next-intl'

import { cleanStackedToast, showStackedToast } from '@/stores/toast-store.actions'

type ToastOptions = {
  title?: string
  body?: string
  variant?: 'success' | 'danger' | 'warning' | 'info'
}

export const useToast = () => {
  const t = useTranslations('common.error')

  const showToast = async (toast: ToastOptions) => {
    showStackedToast(toast)
    cleanStackedToast()
  }

  const showUnexpectedToast = async () => {
    const toast: ToastOptions = {
      variant: 'danger',
      title: t('unexpectedErrorTitle'),
      body: t('unexpectedErrorDesc'),
    }

    showStackedToast(toast)
    cleanStackedToast()
  }

  return { showToast, showUnexpectedToast }
}
