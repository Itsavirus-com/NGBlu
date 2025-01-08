'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { ControlledDatetime } from '@/components/forms/datetime'
import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'
import { Address } from '@/services/swr/models/address.type'
import { CreditCardBrand } from '@/services/swr/models/credit-card-brand.type'
import { CreditCardType } from '@/services/swr/models/credit-card-type.type'
import { EndClient } from '@/services/swr/models/end-client.type'
import { PaymentType } from '@/services/swr/models/payment-type.type'
import { Person } from '@/services/swr/models/person.type'

import usePaymentForm from '../../_hooks/payment-form.hook'

export default function UpdatePayment({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.payments')

  const { methods, onSubmit, isLoading } = usePaymentForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updatePayment')} />
      {isLoading ? (
        <Loading />
      ) : (
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="app-container container-fluid">
            <Card>
              <CardBody>
                <ControlledInput
                  label={t('bankName')}
                  name="bankname"
                  containerClass="mb-3"
                  className="form-control-solid"
                />
                <ControlledInput
                  label={t('bankIban')}
                  name="bankIban"
                  containerClass="mb-3"
                  className="form-control-solid"
                />
                <ControlledInput
                  label={t('bankBic')}
                  name="bankBic"
                  containerClass="mb-3"
                  className="form-control-solid"
                />
                <ControlledInput
                  label={t('creditCardNumber')}
                  name="creditcardNumber"
                  containerClass="mb-3"
                  className="form-control-solid"
                />
                <ControlledDatetime
                  label={t('validTo')}
                  name="validTo"
                  containerClass="mb-3"
                  className="form-control-solid"
                  isRequired
                />
                <ControlledInput
                  label={t('ccv')}
                  name="ccv"
                  containerClass="mb-3"
                  className="form-control-solid"
                />
                <ControlledSelect<PaymentType>
                  label={t('paymentType')}
                  name="paymentTypeId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="payments/types"
                  option={{ label: row => row.paymentType, value: row => row.id }}
                  isRequired
                />
                <ControlledSelect<CreditCardType>
                  label={t('creditCardType')}
                  name="creditcardTypeId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="credit-cards/types"
                  option={{ label: row => row.creditcardType, value: row => row.id }}
                />
                <ControlledSelect<CreditCardBrand>
                  label={t('creditCardBrand')}
                  name="creditcardBrandId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="credit-cards/brands"
                  option={{ label: row => row.brandname, value: row => row.id }}
                />
                <ControlledSelect<Address>
                  label={t('bankAddress')}
                  name="bankAddressId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="addresses"
                  option={{ label: row => row.addressName, value: row => row.id }}
                />
                <ControlledSelect<Person>
                  label={t('personName')}
                  name="personId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="persons"
                  option={{
                    label: row => `${row.firstname} ${row.lastname}`,
                    value: row => row.id,
                  }}
                  isRequired
                />
                <ControlledSelect<EndClient>
                  label={t('endClient')}
                  name="endclientId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="end-clients"
                  option={{ label: row => row.name, value: row => row.id }}
                />
                <ControlledSelect
                  label={t('businessPartner')}
                  name="businesspartnerId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="business-partners"
                  option={{ label: row => row.name, value: row => row.id }}
                />
                <ControlledSelect
                  label={t('enterpriseRoot')}
                  name="enterpriseRootId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="enterprise-roots"
                  option={{ label: row => row.name, value: row => row.id }}
                  isRequired
                />

                <FormButtons />
              </CardBody>
            </Card>
          </div>
        </FormProvider>
      )}
    </>
  )
}
