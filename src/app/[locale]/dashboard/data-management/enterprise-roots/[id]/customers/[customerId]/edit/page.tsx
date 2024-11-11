'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { EndClient } from '@/services/swr/models/end-client.type'
import { EnterpriseRootAddress } from '@/services/swr/models/enterprise-root-address.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'

import useEnterpriseRootCustomerForm from '../../../components/enterprise-root-customer-form.hook'

export default function UpdateEnterpriseRootCustomer({
  params,
}: {
  params: { id: number; customerId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.customers')

  const { methods, onSubmit } = useEnterpriseRootCustomerForm(params.customerId)

  return (
    <>
      <PageTitle title={t('updateCustomer')} />

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
              />
              <ControlledSelect<EnterpriseRootAddress>
                label={t('address')}
                name="enterpriseRootAddressesId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath={`enterprise-roots/${params.id}/addresses`}
                option={{ label: row => row.address.addressName, value: row => row.id }}
              />
              <ControlledSelect<OrganizationUnit>
                label={t('organisationalUnit')}
                name="ouUnitId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath={'organisational-units'}
                option={{ label: row => row.name, value: row => row.id }}
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
