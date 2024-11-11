'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { EndClientAddress } from '@/services/swr/models/end-client-address.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'
import { Project } from '@/services/swr/models/project.type'

import useEnterpriseRootProjectForm from '../../../components/enterprise-root-project-form.hook'

export default function UpdateEnterpriseRootProject({
  params,
}: {
  params: { id: string; projectId: string }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.projects')

  const { methods, onSubmit } = useEnterpriseRootProjectForm(Number(params.projectId))

  return (
    <>
      <PageTitle title={t('updateProject')} />

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
              <ControlledSelect<EndClientAddress>
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
