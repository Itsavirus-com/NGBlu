'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import usePaymentTypeForm from '../components/payment-type-form.hook'
import PaymentTypeForm from '../components/PaymentTypeForm'

export default function NewPaymentType() {
  const t = useTranslations('dataManagement.paymentTypes')
  const { methods, onSubmit } = usePaymentTypeForm()

  return (
    <>
      <PageTitle title={t('newPaymentType')} />
      <PaymentTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
