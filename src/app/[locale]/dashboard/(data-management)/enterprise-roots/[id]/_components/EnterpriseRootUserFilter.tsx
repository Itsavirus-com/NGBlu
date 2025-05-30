import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const EnterpriseRootUserFilter = () => {
  const t = useTranslations('dataManagement.enterpriseRoots.users')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[userId]" label={t('userId')} className="mb-5" />
      <ControlledInput name="filter[personId]" label={t('personId')} className="mb-5" />
    </>
  )
}
