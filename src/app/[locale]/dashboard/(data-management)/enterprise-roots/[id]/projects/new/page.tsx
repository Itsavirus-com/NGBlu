'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { EnterpriseRootAddress } from '@/services/swr/models/enterprise-root-address.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'
import { Project } from '@/services/swr/models/project.type'

import useEnterpriseRootProjectForm from '../../components/enterprise-root-project-form.hook'

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
