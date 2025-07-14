'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import EndClientPaymentDetailForm from '../../../_components/EndClientPaymentDetailForm'
import useEndClientPaymentDetailForm from '../../../_hooks/end-client-payment-detail-form.hook'

export default function UpdateEndClientPaymentDetail({
  params,
}: {
  params: { id: string; paymentDetailId: string }
}) {
  const t = useTranslations('dataManagement.endClients.paymentDetails')

  const { methods, onSubmit, handleChange, errorMessageInputType, paymentType, isSubmitting } =
    useEndClientPaymentDetailForm(Number(params.id), Number(params.paymentDetailId))

  return (
    <>
      <PageTitle title={t('updatePaymentDetail')} />
      <EndClientPaymentDetailForm
        methods={methods}
        onSubmit={onSubmit}
        id={Number(params.id)}
        handleChange={handleChange}
        errorMessageInputType={errorMessageInputType}
        paymentType={paymentType || ''}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
