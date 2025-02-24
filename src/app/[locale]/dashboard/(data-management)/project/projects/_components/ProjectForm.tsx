'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { ControlledSwitch } from '@/components/forms/checkbox'
import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { Address } from '@/services/swr/models/address.type'
import { EndClient } from '@/services/swr/models/end-client.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'
import { ProjectInfo } from '@/services/swr/models/project-info.type'
import { ProjectType } from '@/services/swr/models/project-type'

interface ProjectFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  handleChange: (value: 'endclientId' | 'businesspartnerId' | 'enterpriseRootId') => void
  handleFilterOrganizationUnit: () => Record<string, any> | undefined
  errorMessageInputType?: string
  isSubmitting: boolean
}

export default function ProjectForm({
  methods,
  onSubmit,
  handleChange,
  handleFilterOrganizationUnit,
  errorMessageInputType,
  isSubmitting,
}: ProjectFormProps) {
  const t = useTranslations('dataManagement.projects')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <Row>
              <Col>
                <ControlledInput
                  label={t('projectName')}
                  name="projectName"
                  containerClass="mb-3"
                  className="form-control-solid"
                  isRequired
                />
                <ControlledSelect<Address>
                  label={t('address')}
                  name="addressId"
                  containerClass="mb-3"
                  apiPath="addresses"
                  option={{ label: row => row.addressName, value: row => row.id }}
                />
                <ControlledSelect<ProjectInfo>
                  label={t('projectInfo')}
                  name="projectInfoId"
                  containerClass="mb-3"
                  apiPath="projects/infos"
                  option={{ label: row => row.projectInfo, value: row => row.id }}
                  isRequired
                />
                <div className="d-flex gap-3">
                  <ControlledSwitch
                    type="radio"
                    label={t('endClient')}
                    name="inputType"
                    value="endclientId"
                    containerClass="mb-3"
                    onChange={() => handleChange('endclientId')}
                  />
                  <ControlledSwitch
                    type="radio"
                    label={t('businessPartner')}
                    name="inputType"
                    value="businesspartnerId"
                    containerClass="mb-3"
                    onChange={() => handleChange('businesspartnerId')}
                  />
                  <ControlledSwitch
                    type="radio"
                    label={t('enterpriseRoot')}
                    name="inputType"
                    value="enterpriseRootId"
                    containerClass="mb-3"
                    onChange={() => handleChange('enterpriseRootId')}
                  />
                </div>
                {errorMessageInputType && (
                  <div className="invalid-feedback d-block mt-0">{errorMessageInputType}</div>
                )}

                {methods.watch('inputType') === 'endclientId' && (
                  <ControlledSelect<EndClient>
                    label={t('endClient')}
                    name="endclientId"
                    containerClass="mb-3"
                    apiPath="end-clients"
                    option={{ label: row => row.name, value: row => row.id }}
                    onChange={value => {
                      methods.setValue('ouUnitId', 0)
                    }}
                    isRequired
                  />
                )}
                {methods.watch('inputType') === 'businesspartnerId' && (
                  <ControlledSelect
                    label={t('businessPartner')}
                    name="businesspartnersId"
                    containerClass="mb-3"
                    apiPath="business-partners"
                    option={{ label: row => row.name, value: row => row.id }}
                    onChange={value => {
                      methods.setValue('ouUnitId', 0)
                    }}
                    isRequired
                  />
                )}
                {(methods.watch('inputType') === 'enterpriseRootId' ||
                  methods.watch('inputType') === 'endclientId') && (
                  <ControlledSelect
                    label={t('enterpriseRoot')}
                    name="enterpriseRootId"
                    containerClass="mb-3"
                    apiPath="enterprise-roots"
                    option={{ label: row => row.name, value: row => row.id }}
                    onChange={value => {
                      methods.setValue('ouUnitId', 0)
                    }}
                    isRequired
                  />
                )}

                {!!methods.watch('inputType') && (
                  <ControlledSelect<OrganizationUnit>
                    label={t('organizationUnit')}
                    name="ouUnitId"
                    containerClass="mb-3"
                    apiPath="organisational-units"
                    filter={handleFilterOrganizationUnit()}
                    option={{ label: row => row.name, value: row => row.id }}
                    disabled={!handleFilterOrganizationUnit()}
                    isHidden
                  />
                )}
              </Col>

              <Col>
                <ControlledSelect<ProjectType>
                  label={t('projectType')}
                  name="projectTypeId"
                  containerClass="mb-3"
                  apiPath="projects/types"
                  option={{ label: row => row.projectType, value: row => row.id }}
                  isRequired
                />
              </Col>
            </Row>

            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
