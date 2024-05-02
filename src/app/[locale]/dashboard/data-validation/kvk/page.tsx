import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

export default function Kvk() {
  const t = useTranslations('data_validation.kvk')

  return <PageTitle title={t('title')} />
}
