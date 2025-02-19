'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import EndClientPaymentDetailForm from '../../_components/EndClientPaymentDetailForm'
import useEndClientPaymentDetailForm from '../../_hooks/end-client-payment-detail-form.hook'

export default function NewEndClientPaymentDetail({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.endClients.paymentDetails')

  const { methods, onSubmit, handleChange, errorMessageInputType } = useEndClientPaymentDetailForm(
    Number(params.id)
  )

  return (
    <>
      <PageTitle title={t('newPaymentDetail')} />
      <EndClientPaymentDetailForm
        methods={methods}
        onSubmit={onSubmit}
        id={Number(params.id)}
        handleChange={handleChange}
        errorMessageInputType={errorMessageInputType}
      />
    </>
  )
}
