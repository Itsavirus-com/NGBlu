import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { BusinessPartner } from '@/services/swr/models/business-partner.type'
import { EnterpriseRoot } from '@/services/swr/models/enterprise-root.type'
import { Payment } from '@/services/swr/models/payment.type'

interface EndClientPaymentDetailFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  id: number
}

const EndClientPaymentDetailForm = ({ methods, onSubmit, id }: EndClientPaymentDetailFormProps) => {
  const t = useTranslations('dataManagement.endClients.paymentDetails')

  const paymentInfoLabel = (row: Payment): string => {
    if (row.paymentType.id === 1) {
      return `${row.paymentType.paymentType} - ${row.person.firstname} ${row.person.lastname} - ${row.bankname} - ${row.bankIban}`
    }
    return `${row.paymentType.paymentType} - ${row.person.firstname} ${row.person.lastname} - ${row.creditCardBrand.brandname} - ${row.creditcardNumber}`
  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledSelect<EnterpriseRoot>
              label={t('enterpriseRoot')}
              name="enterpriseRootId"
              containerClass="mb-3"
              apiPath="enterprise-roots"
              option={{ label: row => row.name, value: row => row.id }}
              // filter={{
              //   endclientId: id,
              // }}
              isRequired
            />

            <ControlledSelect<BusinessPartner>
              label={t('businessPartner')}
              name="businesspartnerId"
              containerClass="mb-3"
              apiPath="business-partners"
              option={{ label: row => row.name, value: row => row.id }}
              isRequired
            />

            <ControlledSelect<Payment>
              label={t('paymentInfo')}
              name="paymentInfoId"
              containerClass="mb-3"
              apiPath={'payments/details'}
              option={{ label: paymentInfoLabel, value: row => row.id }}
              isRequired
              disabled={!methods.watch('enterpriseRootId') && !methods.watch('businesspartnerId')}
              filter={{
                enterpriseRootId: methods.watch('enterpriseRootId'),
                businesspartnerId: methods.watch('businesspartnerId'),
              }}
            />

            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}

export default EndClientPaymentDetailForm
