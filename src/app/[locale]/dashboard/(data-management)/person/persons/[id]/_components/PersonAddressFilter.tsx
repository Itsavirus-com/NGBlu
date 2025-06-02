import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'

export const AddressFilter = () => {
  const t = useTranslations('dataManagement.persons.addresses')

  return (
    <>
      <ControlledInput name="filter[addressId]" label={t('addressId')} className="mb-10" />
    </>
  )
}
