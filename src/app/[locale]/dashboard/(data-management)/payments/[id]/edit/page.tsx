'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import PaymentForm from '../../_components/PaymentForm'
import usePaymentForm from '../../_hooks/payment-form.hook'

export default function UpdatePayment({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.payments')

  const { methods, onSubmit, selectedPayment, handleChange, isSubmitting } = usePaymentForm(
    Number(params.id)
  )

  return (
    <>
      <PageTitle title={t('updatePayment')} />
      <PaymentForm
        methods={methods}
        onSubmit={onSubmit}
        handleChange={handleChange}
        selectedPayment={selectedPayment}
        isSubmitting={isSubmitting}
        isUpdate={true}
      />
    </>
  )
}
