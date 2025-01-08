'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { Address } from '@/services/swr/models/address.type'
import { EndClient } from '@/services/swr/models/end-client.type'
import { EnterpriseRootCustomer } from '@/services/swr/models/enterprise-root-customer.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'

import useEnterpriseRootCustomerForm from '../../_hooks/enterprise-root-customer-form.hook'

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
                isRequired
              />
              <ControlledSelect<Address>
                label={t('address')}
                name="enterpriseRootAddressesId"
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
                filter={{ enterpriseRootId: params.id }}
              />
              <ControlledSelect<EnterpriseRootCustomer>
                label={t('parent')}
                name="parentId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath={`enterprise-roots/${params.id}/customers`}
                option={{
                  label: row => `${row.endclientId} | ${row.endclient.name}`,
                  value: row => row.id as number,
                }}
              />
              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
