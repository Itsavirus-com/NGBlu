import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { Payment } from '@/services/swr/models/payment.type'

interface EndClientPaymentDetailFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
}

const EndClientPaymentDetailForm = ({ methods, onSubmit }: EndClientPaymentDetailFormProps) => {
  const t = useTranslations('dataManagement.endClients.paymentDetails')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledSelect<Payment>
              label={t('paymentInfo')}
              name="paymentInfoId"
              containerClass="mb-3"
              apiPath={'payments/details'}
              option={{ label: row => row.paymentType.paymentType, value: row => row.id }}
              isRequired
            />

            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}

export default EndClientPaymentDetailForm
