'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { BusinessPartnerAddress } from '@/services/swr/models/business-partner-address.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'
import { Project } from '@/services/swr/models/project.type'

import useBusinessPartnerProjectForm from '../../../components/business-partner-project-form.hook'

export default function UpdateBusinessPartnerProjectPage({
  params,
}: {
  params: { id: string; projectId: string }
}) {
  const t = useTranslations('dataManagement.businessPartners.projects')

  const { methods, onSubmit } = useBusinessPartnerProjectForm(
    Number(params.id),
    Number(params.projectId)
  )

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
              <ControlledSelect<BusinessPartnerAddress>
                label={t('businessPartnerAddress')}
                name="businesspartnersAddressesId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath={`business-partners/${params.id}/addresses`}
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
