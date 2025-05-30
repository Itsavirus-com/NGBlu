import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const EndClientAddressFilter = () => {
  const t = useTranslations('dataManagement.endClients.addresses')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[addressId]" label={t('addressId')} className="mb-10" />
    </>
  )
}
