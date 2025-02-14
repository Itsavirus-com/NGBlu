'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { Address } from '@/services/swr/models/address.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'

interface EnterpriseRootFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
}

export default function EnterpriseRootForm({ methods, onSubmit }: EnterpriseRootFormProps) {
  const t = useTranslations('dataManagement.enterpriseRoots')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledInput
              label={t('name')}
              name="name"
              containerClass="mb-3"
              className="form-control-solid"
              isRequired
            />
            <ControlledSelect<Address>
              label={t('enterpriseRootAddress')}
              name="enterpriseRootAddressesId"
              containerClass="mb-3"
              apiPath="addresses"
              option={{ label: row => row.addressName, value: row => row.id }}
              isRequired
            />
            <ControlledSelect<OrganizationUnit>
              label={t('organisationUnit')}
              name="ouUnitId"
              containerClass="mb-3"
              apiPath={'organisational-units'}
              option={{ label: row => row.name, value: row => row.id }}
            />
            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
