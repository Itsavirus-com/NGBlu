'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import PaymentTypeForm from '../_components/PaymentTypeForm'
import usePaymentTypeForm from '../_hooks/payment-type-form.hook'

export default function NewPaymentType() {
  const t = useTranslations('dataManagement.paymentTypes')
  const { methods, onSubmit, isSubmitting } = usePaymentTypeForm()

  return (
    <>
      <PageTitle title={t('newPaymentType')} />
      <PaymentTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
