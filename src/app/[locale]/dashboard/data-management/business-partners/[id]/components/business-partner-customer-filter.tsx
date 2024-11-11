import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/input'

export const BusinessPartnerCustomerFilter = () => {
  const t = useTranslations('dataManagement.businessPartners.customers')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[endclientId]" label={t('endClientId')} className="mb-5" />
      <ControlledInput
        name="filter[businesspartnersAddressesId]"
        label={t('businessPartnerAddressId')}
        className="mb-5"
      />
    </>
  )
}
