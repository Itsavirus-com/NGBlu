import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const EnterpriseRootBusinessPartnerFilter = () => {
  const t = useTranslations('dataManagement.businessPartners.businessPartnerCustomers')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[name]" label={t('businessPartnerName')} className="mb-5" />
    </>
  )
}
