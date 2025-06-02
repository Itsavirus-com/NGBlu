import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'

export const AddressFilter = () => {
  const t = useTranslations('dataManagement.addresses')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[addressName]" label={t('name')} className="mb-10" />
    </>
  )
}
