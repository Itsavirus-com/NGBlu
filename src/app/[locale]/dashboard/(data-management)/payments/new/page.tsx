'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import PaymentForm from '../_components/PaymentForm'
import usePaymentForm from '../_hooks/payment-form.hook'

export default function NewPayment() {
  const t = useTranslations('dataManagement.payments')
  const { methods, onSubmit, handleChange, selectedPayment, isSubmitting } = usePaymentForm()

  return (
    <>
      <PageTitle title={t('newPayment')} />
      <PaymentForm
        methods={methods}
        onSubmit={onSubmit}
        handleChange={handleChange}
        selectedPayment={selectedPayment}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
