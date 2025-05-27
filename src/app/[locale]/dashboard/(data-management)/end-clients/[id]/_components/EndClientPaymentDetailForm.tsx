import { useTranslations } from 'next-intl'
import { Card, CardBody, FormLabel } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { ControlledSelect } from '@/components/forms/controlled-select/ControlledSelect'
import { ControlledSwitch } from '@/components/forms/controlled-switch/ControlledSwitch'
import { FormButtons } from '@/components/forms/form-buttons/FormButtons'
import { FormProvider } from '@/components/forms/form-provider'
import { BusinessPartner } from '@/services/swr/models/business-partner.type'
import { EnterpriseRoot } from '@/services/swr/models/enterprise-root.type'
import { Payment } from '@/services/swr/models/payment.type'

interface EndClientPaymentDetailFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  id: number
  handleChange: (value: 'businesspartnerId' | 'enterpriseRootId') => void
  errorMessageInputType?: string
  paymentType: string
  isSubmitting: boolean
}

const EndClientPaymentDetailForm = ({
  methods,
  onSubmit,
  id,
  handleChange,
  errorMessageInputType,
  paymentType,
  isSubmitting,
}: EndClientPaymentDetailFormProps) => {
  const t = useTranslations('dataManagement.endClients.paymentDetails')

  const paymentInfoLabel = (row: Payment): string => {
    if (row?.paymentType?.id === 1) {
      return `${row?.paymentType?.paymentType} - ${row?.person?.firstname} ${row?.person?.lastname} - ${row?.bankname} - ${row?.bankIban}`
    }
    return `${row?.paymentType?.paymentType} - ${row?.person?.firstname} ${row?.person?.lastname} - ${row?.creditCardBrand?.brandname} - ${row?.creditcardNumber}`
  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <FormLabel className="mb-2 fw-bold">
              {t('chooseOption')} <span className="text-danger">*</span>
            </FormLabel>
            <div className="d-flex gap-3">
              <ControlledSwitch
                type="radio"
                label={t('businessPartner')}
                name="inputType"
                containerClass="mb-3"
                value={'businesspartnerId'}
                onChange={() => handleChange('businesspartnerId')}
              />
              <ControlledSwitch
                type="radio"
                label={t('enterpriseRoot')}
                name="inputType"
                containerClass="mb-3"
                value={'enterpriseRootId'}
                onChange={() => handleChange('enterpriseRootId')}
              />
            </div>
            {errorMessageInputType && (
              <div className="invalid-feedback d-block mt-0">{errorMessageInputType}</div>
            )}

            {methods.watch('inputType') === 'enterpriseRootId' && (
              <ControlledSelect<EnterpriseRoot>
                label={t('enterpriseRoot')}
                name="enterpriseRootId"
                containerClass="mb-3"
                apiPath={`end-clients/${id}/enterprise-roots`}
                option={{ label: row => row.name, value: row => row.id }}
                isRequired
                isSelectedIdWithParams
              />
            )}

            {methods.watch('inputType') === 'businesspartnerId' && (
              <ControlledSelect<BusinessPartner>
                label={t('businessPartner')}
                name="businesspartnerId"
                containerClass="mb-3"
                apiPath={`end-clients/${id}/business-partners`}
                option={{ label: row => row.name, value: row => row.id }}
                isRequired
                isSelectedIdWithParams
              />
            )}

            <ControlledSelect<Payment>
              label={t('paymentInfo')}
              name="paymentInfoId"
              containerClass="mb-3"
              apiPath={'payments/details'}
              apiPathSelected={`payments/details/${paymentType.toLowerCase() === 'bank' ? 'bank' : 'credit-card'}`}
              option={{ label: paymentInfoLabel, value: row => row.id }}
              isRequired
              disabled={!methods.watch('enterpriseRootId') && !methods.watch('businesspartnerId')}
              filter={{
                ...(methods.watch('inputType') === 'enterpriseRootId' && {
                  enterpriseRootId: methods.watch('enterpriseRootId'),
                }),
                ...(methods.watch('inputType') === 'businesspartnerId' && {
                  businesspartnerId: methods.watch('businesspartnerId'),
                }),
              }}
            />

            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}

export default EndClientPaymentDetailForm
