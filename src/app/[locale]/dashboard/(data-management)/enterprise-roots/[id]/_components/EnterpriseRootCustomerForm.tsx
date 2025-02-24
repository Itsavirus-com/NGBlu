'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { Address } from '@/services/swr/models/address.type'
import { EndClient } from '@/services/swr/models/end-client.type'
import { EnterpriseRootCustomer } from '@/services/swr/models/enterprise-root-customer.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'

interface EnterpriseRootCustomerFormProps {
  enterpriseRootId: number
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

export function EnterpriseRootCustomerForm({
  enterpriseRootId,
  methods,
  onSubmit,
  isSubmitting,
}: EnterpriseRootCustomerFormProps) {
  const t = useTranslations('dataManagement.enterpriseRoots.customers')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledSelect<EndClient>
              label={t('endClient')}
              name="endclientId"
              containerClass="mb-3"
              apiPath={'end-clients'}
              option={{ label: row => row.name, value: row => row.id }}
              isRequired
            />
            <ControlledSelect<Address>
              label={t('enterpriseRootAddress')}
              name="enterpriseRootAddressesId"
              containerClass="mb-3"
              apiPath={`addresses`}
              option={{ label: row => row.addressName, value: row => row.id }}
              isRequired
            />
            <ControlledSelect<OrganizationUnit>
              label={t('organisationalUnit')}
              name="ouUnitId"
              containerClass="mb-3"
              apiPath={'organisational-units'}
              option={{ label: row => row.name, value: row => row.id }}
              filter={{ enterpriseRootId }}
            />
            <ControlledSelect<EnterpriseRootCustomer>
              label={t('parent')}
              name="parentId"
              containerClass="mb-3"
              apiPath={`enterprise-roots/${enterpriseRootId}/customers`}
              option={{
                label: row => `${row.endclientId} | ${row.endclient.name}`,
                value: row => row.id as number,
              }}
            />
            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
