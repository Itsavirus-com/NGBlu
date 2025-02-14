import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/input'

export const BusinessPartnerFilter = () => {
  const t = useTranslations('dataManagement.enterpriseRoots.businessPartners')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[name]" label={t('businessPartnerName')} className="mb-5" />
    </>
  )
}
