'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'
import { Address } from '@/services/swr/models/address.type'
import { EndClient } from '@/services/swr/models/end-client.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'

import useBusinessPartnerCustomerForm from '../../_hooks/business-partner-customer-form.hook'

export default function UpdateBusinessPartnerCustomer({
  params,
}: {
  params: { id: string; customerId: string }
}) {
  const t = useTranslations('dataManagement.businessPartners.customers')

  const { methods, onSubmit, isLoading } = useBusinessPartnerCustomerForm(
    Number(params.id),
    Number(params.customerId)
  )

  return (
    <>
      <PageTitle title={t('updateCustomer')} />
      {isLoading ? (
        <Loading />
      ) : (
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="app-container container-fluid">
            <Card>
              <CardBody>
                <ControlledSelect<EndClient>
                  label={t('endClient')}
                  name="endclientId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath={'end-clients'}
                  option={{ label: row => row.name, value: row => row.id }}
                  isRequired
                />
                <ControlledSelect<Address>
                  label={t('businessPartnerAddress')}
                  name="businesspartnersAddressesId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath={`addresses`}
                  option={{ label: row => row.addressName, value: row => row.id }}
                  isRequired
                />
                <ControlledSelect<OrganizationUnit>
                  label={t('organisationalUnit')}
                  name="ouUnitId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath={'organisational-units'}
                  option={{ label: row => row.name, value: row => row.id }}
                  filter={{
                    businesspartnerId: params.id,
                  }}
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
