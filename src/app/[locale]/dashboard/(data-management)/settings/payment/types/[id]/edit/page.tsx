'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import usePaymentTypeForm from '../../components/payment-type-form.hook'
import PaymentTypeForm from '../../components/PaymentTypeForm'

export default function UpdatePaymentType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.paymentTypes')
  const { methods, onSubmit } = usePaymentTypeForm(params?.id)

  return (
    <>
      <PageTitle title={t('updatePaymentType')} />
      <PaymentTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
