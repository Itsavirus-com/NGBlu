import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'

export const EndClientPaymentDetailFilter = () => {
  const t = useTranslations('dataManagement.endClients.paymentDetails')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[paymentInfoId]" label={t('paymentInfoId')} className="mb-10" />
    </>
  )
}
