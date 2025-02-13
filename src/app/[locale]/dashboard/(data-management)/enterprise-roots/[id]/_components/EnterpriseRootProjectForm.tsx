'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { Address } from '@/services/swr/models/address.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'
import { Project } from '@/services/swr/models/project.type'

interface EnterpriseRootProjectFormProps {
  enterpriseRootId: number
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
}

export function EnterpriseRootProjectForm({
  enterpriseRootId,
  methods,
  onSubmit,
}: EnterpriseRootProjectFormProps) {
  const t = useTranslations('dataManagement.enterpriseRoots.projects')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledSelect<Project>
              label={t('project')}
              name="projectId"
              containerClass="mb-3"
              apiPath={'projects'}
              option={{ label: row => row.projectName, value: row => row.id }}
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
            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
