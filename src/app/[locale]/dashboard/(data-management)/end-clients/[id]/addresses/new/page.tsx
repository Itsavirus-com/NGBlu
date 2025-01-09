'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { ControlledSwitch } from '@/components/forms/checkbox'
import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { Address } from '@/services/swr/models/address.type'

import useEndClientAddressForm from '../../_hooks/end-client-address-form.hook'

export default function NewEndClientAddress({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.endClients.addresses')

  const { methods, onSubmit } = useEndClientAddressForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('newAddress')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledSelect<Address>
                label={t('address')}
                name="addressId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath={'addresses'}
                option={{ label: row => row.addressName, value: row => row.id }}
                isRequired
              />
              <ControlledSwitch label={t('primaryAddress')} name="isPrimaryLocation" />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
