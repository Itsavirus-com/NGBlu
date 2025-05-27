import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'

export const BusinessPartnerFilter = () => {
  const t = useTranslations('dataManagement.businessPartners')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[companyInfoId]" label={t('companyId')} className="mb-10" />
    </>
  )
}
