import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'

export const CompanyFilter = () => {
  const t = useTranslations('dataManagement.companies')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[companyname]" label={t('name')} className="mb-10" />
    </>
  )
}
