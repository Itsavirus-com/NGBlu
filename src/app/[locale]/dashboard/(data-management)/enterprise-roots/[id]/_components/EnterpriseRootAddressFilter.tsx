import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const EnterpriseRootAddressFilter = () => {
  const t = useTranslations('dataManagement.enterpriseRoots.addresses')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[addressId]" label={t('addressId')} className="mb-5" />
      <ControlledInput name="filter[addressTypeId]" label={t('addressTypeId')} className="mb-5" />
    </>
  )
}
