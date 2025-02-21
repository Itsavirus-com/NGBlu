'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import PaymentTypeForm from '../../_components/PaymentTypeForm'
import usePaymentTypeForm from '../../_hooks/payment-type-form.hook'

export default function UpdatePaymentType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.paymentTypes')
  const { methods, onSubmit, isSubmitting, isLoading } = usePaymentTypeForm(params?.id)

  return (
    <>
      <PageTitle title={t('updatePaymentType')} />
      {isLoading ? (
        <Loading />
      ) : (
        <PaymentTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
