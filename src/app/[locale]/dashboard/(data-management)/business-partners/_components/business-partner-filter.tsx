import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const BusinessPartnerFilter = () => {
  const t = useTranslations('dataManagement.businessPartners')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[name]" label={t('name')} className="mb-10" />
    </>
  )
}
