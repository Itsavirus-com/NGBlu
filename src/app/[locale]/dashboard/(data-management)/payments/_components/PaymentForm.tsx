'use client'

import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index'
import 'flatpickr/dist/plugins/monthSelect/style.css'
import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { ControlledSwitch } from '@/components/forms/checkbox'
import { ControlledDatetime } from '@/components/forms/datetime'
import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { Address } from '@/services/swr/models/address.type'
import { CreditCardBrand } from '@/services/swr/models/credit-card-brand.type'
import { CreditCardType } from '@/services/swr/models/credit-card-type.type'
import { EndClient } from '@/services/swr/models/end-client.type'
import { Person } from '@/services/swr/models/person.type'
import { getFirstDayOfCurrentMonth } from '@/utils/dateTime'

interface PaymentFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  handleChange: (value: number) => void
  selectedPayment: number
}

export default function PaymentForm({
  methods,
  onSubmit,
  handleChange,
  selectedPayment,
}: PaymentFormProps) {
  const t = useTranslations('dataManagement.payments')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <div className="d-flex gap-3">
              <ControlledSwitch
                type="radio"
                label={t('bankAccount')}
                name="selectedPayment"
                containerClass="mb-3"
                value={1}
                onChange={() => {
                  handleChange(1)
                  methods.setValue('paymentTypeId', 1)
                }}
              />
              <ControlledSwitch
                type="radio"
                label={t('creditCard')}
                name="selectedPayment"
                containerClass="mb-3"
                value={2}
                onChange={() => {
                  handleChange(2)
                  methods.setValue('paymentTypeId', 2)
                }}
              />
            </div>
            <ControlledSelect<Person>
              label={t('personName')}
              name="personId"
              containerClass="mb-3"
              apiPath="persons"
              option={{
                label: row => `${row.firstname} ${row.lastname}`,
                value: row => row.id,
              }}
              isRequired
            />
            {selectedPayment === 1 && (
              <>
                <ControlledInput
                  label={t('bankName')}
                  name="bankname"
                  containerClass="mb-3"
                  className="form-control-solid"
                  isRequired
                />
                <ControlledInput
                  label={t('bankIban')}
                  name="bankIban"
                  containerClass="mb-3"
                  className="form-control-solid"
                  isRequired
                />
                <ControlledInput
                  label={t('bankBic')}
                  name="bankBic"
                  containerClass="mb-3"
                  className="form-control-solid"
                  isRequired
                />
                <ControlledSelect<Address>
                  label={t('bankAddress')}
                  name="bankAddressId"
                  containerClass="mb-3"
                  apiPath="addresses"
                  option={{ label: row => row.addressName, value: row => row.id }}
                />
              </>
            )}
            {selectedPayment === 2 && (
              <>
                <ControlledInput
                  label={t('creditCardNumber')}
                  name="creditcardNumber"
                  containerClass="mb-3"
                  className="form-control-solid"
                  isRequired
                />
                <ControlledDatetime
                  label={t('validTo')}
                  name="validTo"
                  containerClass="mb-3"
                  className="form-control-solid"
                  isRequired
                  options={{
                    minDate: getFirstDayOfCurrentMonth(),
                    enableTime: false,
                    plugins: [
                      monthSelectPlugin({
                        shorthand: false,
                        dateFormat: 'm/Y',
                        altFormat: 'F Y',
                      }),
                    ],
                  }}
                  dateFormat="m/Y"
                  customSubmitDateFormat="MM-yyyy"
                />
                <ControlledInput
                  label={t('cvc/cvv')}
                  name="cvv"
                  containerClass="mb-3"
                  className="form-control-solid"
                  isRequired
                />
                <ControlledSelect<CreditCardType>
                  label={t('creditCardType')}
                  name="creditcardTypeId"
                  containerClass="mb-3"
                  apiPath="credit-cards/types"
                  option={{ label: row => row.creditcardType, value: row => row.id }}
                  isRequired
                />
                <ControlledSelect<CreditCardBrand>
                  label={t('creditCardBrand')}
                  name="creditcardBrandId"
                  containerClass="mb-3"
                  apiPath="credit-cards/brands"
                  option={{ label: row => row.brandname, value: row => row.id }}
                  isRequired
                />
              </>
            )}
            <ControlledSelect
              label={t('enterpriseRoot')}
              name="enterpriseRootId"
              containerClass="mb-3"
              apiPath="enterprise-roots"
              option={{ label: row => row.name, value: row => row.id }}
              isRequired
            />
            <ControlledSelect
              label={t('businessPartner')}
              name="businesspartnerId"
              containerClass="mb-3"
              apiPath="business-partners"
              option={{ label: row => row.name, value: row => row.id }}
            />
            <ControlledSelect<EndClient>
              label={t('endClient')}
              name="endclientId"
              containerClass="mb-3"
              apiPath="end-clients"
              option={{ label: row => row.name, value: row => row.id }}
            />

            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
