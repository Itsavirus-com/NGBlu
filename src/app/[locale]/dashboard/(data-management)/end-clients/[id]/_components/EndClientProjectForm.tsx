'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { ControlledSelect } from '@/components/forms/controlled-select/ControlledSelect'
import { FormButtons } from '@/components/forms/form-buttons/FormButtons'
import { FormProvider } from '@/components/forms/form-provider'
import { Address } from '@/services/swr/models/address.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'
import { Project } from '@/services/swr/models/project.type'

interface EndClientProjectFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  id: number
  isSubmitting: boolean
}

export default function EndClientProjectForm({
  methods,
  onSubmit,
  id,
  isSubmitting,
}: EndClientProjectFormProps) {
  const t = useTranslations('dataManagement.endClients.projects')

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
              label={t('endClientAddress')}
              name="endclientAddressesId"
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
              filter={{
                endclientId: id,
              }}
              isHidden
            />

            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
