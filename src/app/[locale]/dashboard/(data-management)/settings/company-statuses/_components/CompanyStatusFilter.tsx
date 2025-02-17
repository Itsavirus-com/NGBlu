import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/input'

export const CompanyStatusFilter = () => {
  const t = useTranslations('dataManagement.companyStatuses')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[status]" label={t('status')} className="mb-10" />
    </>
  )
}
