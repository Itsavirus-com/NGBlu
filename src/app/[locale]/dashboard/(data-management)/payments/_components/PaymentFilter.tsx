import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const PaymentFilter = () => {
  const t = useTranslations('dataManagement.payments')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[bankname]" label={t('bankName')} className="mb-10" />
    </>
  )
}
