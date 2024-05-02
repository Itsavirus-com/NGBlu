import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

export default function Google() {
  const t = useTranslations('data_validation.google')

  return <PageTitle title={t('title')} />
}
