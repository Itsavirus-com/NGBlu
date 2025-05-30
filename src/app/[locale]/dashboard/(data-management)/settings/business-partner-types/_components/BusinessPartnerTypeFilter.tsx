import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const BusinessPartnerTypeFilter = () => {
  const t = useTranslations('dataManagement.businessPartnerTypes')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[type]" label={t('type')} className="mb-10" />
    </>
  )
}
