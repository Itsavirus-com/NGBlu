import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/input'

export const AddressTypeFilter = () => {
  const t = useTranslations('dataManagement.addressTypes')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[addressType]" label={t('addressType')} className="mb-10" />
    </>
  )
}
