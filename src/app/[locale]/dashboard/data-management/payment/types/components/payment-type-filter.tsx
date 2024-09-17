import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/input'

export const PaymentTypeFilter = () => {
  const t = useTranslations('dataManagement.paymentTypes')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[paymentType]" label={t('name')} className="mb-10" />
    </>
  )
}
