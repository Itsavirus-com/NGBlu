'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import PaymentForm from '../../_components/PaymentForm'
import usePaymentForm from '../../_hooks/payment-form.hook'

export default function UpdatePayment({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.payments')

  const { methods, onSubmit, isLoading, selectedPayment, handleChange } = usePaymentForm(
    Number(params.id)
  )

  return (
    <>
      <PageTitle title={t('updatePayment')} />
      {isLoading ? (
        <Loading />
      ) : (
        <PaymentForm
          methods={methods}
          onSubmit={onSubmit}
          handleChange={handleChange}
          selectedPayment={selectedPayment}
        />
      )}
    </>
  )
}
