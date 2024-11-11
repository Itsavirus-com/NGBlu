import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/input'

export const EnterpriseRootCustomerFilter = () => {
  const t = useTranslations('dataManagement.enterpriseRoots.customers')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[endclientId]" label={t('endClientId')} className="mb-5" />
      <ControlledInput
        name="filter[enterpriseRootAddressesId]"
        label={t('addressId')}
        className="mb-5"
      />
    </>
  )
}
