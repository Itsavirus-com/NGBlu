import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/input'

export const BusinessPartnerAddressFilter = () => {
  const t = useTranslations('dataManagement.businessPartners.addresses')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[addressId]" label={t('addressId')} className="mb-10" />
      <ControlledInput name="filter[addressTypeId]" label={t('addressTypeId')} className="mb-10" />
    </>
  )
}
