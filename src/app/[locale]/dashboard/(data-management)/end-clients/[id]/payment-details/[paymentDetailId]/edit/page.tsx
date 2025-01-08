'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { Payment } from '@/services/swr/models/payment.type'

import useEndClientPaymentDetailForm from '../../_hooks/end-client-payment-detail-form.hook'

export default function UpdateEndClientPaymentDetail({
  params,
}: {
  params: { id: string; paymentDetailId: string }
}) {
  const t = useTranslations('dataManagement.endClients.paymentDetails')

  const { methods, onSubmit } = useEndClientPaymentDetailForm(
    Number(params.id),
    Number(params.paymentDetailId)
  )

  return (
    <>
      <PageTitle title={t('updatePaymentDetail')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledSelect<Payment>
                label={t('paymentInfo')}
                name="paymentInfoId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath={'payments/details'}
                option={{ label: row => row.paymentType.paymentType, value: row => row.id }}
                isRequired
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
