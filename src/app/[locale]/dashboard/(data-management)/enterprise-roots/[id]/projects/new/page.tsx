'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { Address } from '@/services/swr/models/address.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'
import { Project } from '@/services/swr/models/project.type'

import useEnterpriseRootProjectForm from '../../_hooks/enterprise-root-project-form.hook'

export default function NewEnterpriseRootProject({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.enterpriseRoots.projects')

  const { methods, onSubmit } = useEnterpriseRootProjectForm()

  return (
    <>
      <PageTitle title={t('newProject')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledSelect<Project>
                label={t('project')}
                name="projectId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath={'projects'}
                option={{ label: row => row.projectName, value: row => row.id }}
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

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
