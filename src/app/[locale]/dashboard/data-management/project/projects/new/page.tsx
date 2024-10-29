'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { Address } from '@/services/swr/models/address.type'
import { EndClient } from '@/services/swr/models/end-client.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'
import { ProjectInfo } from '@/services/swr/models/project-info.type'
import { ProjectType } from '@/services/swr/models/project-type'

import useProjectForm from '../components/project-form.hook'

export default function NewProjectType() {
  const t = useTranslations('dataManagement.projects')

  const { methods, onSubmit } = useProjectForm()

  return (
    <>
      <PageTitle title={t('newProject')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('projectName')}
                name="projectName"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledSelect<ProjectType>
                label={t('projectType')}
                name="projectTypeId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="projects/types"
                option={{ label: row => row.projectType, value: row => row.id }}
              />
              <ControlledSelect<ProjectInfo>
                label={t('projectInfo')}
                name="projectInfoId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="projects/infos"
                option={{ label: row => row.projectInfo, value: row => row.id }}
              />
              <ControlledSelect<Address>
                label={t('address')}
                name="addressId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="addresses"
                option={{ label: row => row.addressName, value: row => row.id }}
              />
              <ControlledSelect<OrganizationUnit>
                label={t('organizationUnit')}
                name="ouUnitId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="organisational-units"
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect<EndClient>
                label={t('endClient')}
                name="endclientId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="end-clients"
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect
                label={t('businessPartner')}
                name="businesspartnersId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="business-partners"
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect
                label={t('enterpriseRoot')}
                name="enterpriseRootId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="enterprise-roots"
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
