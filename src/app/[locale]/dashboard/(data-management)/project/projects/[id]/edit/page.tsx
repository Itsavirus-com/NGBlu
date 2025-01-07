'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { ControlledSwitch } from '@/components/forms/checkbox'
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

import useProjectForm from '../../hooks/project-form.hook'

export default function UpdateProjectType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.projects')

  const { methods, inputType, inputValue, handleChange, onSubmit, setInputValue } = useProjectForm(
    Number(params.id)
  )

  return (
    <>
      <PageTitle title={t('updateProject')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('projectName')}
                name="projectName"
                containerClass="mb-3"
                className="form-control-solid"
                isRequired
              />
              <ControlledSelect<ProjectType>
                label={t('projectType')}
                name="projectTypeId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="projects/types"
                option={{ label: row => row.projectType, value: row => row.id }}
                isRequired
              />
              <ControlledSelect<ProjectInfo>
                label={t('projectInfo')}
                name="projectInfoId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="projects/infos"
                option={{ label: row => row.projectInfo, value: row => row.id }}
                isRequired
              />
              <ControlledSelect<Address>
                label={t('address')}
                name="addressId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="addresses"
                option={{ label: row => row.addressName, value: row => row.id }}
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
              {inputType === 'endclientId' && (
                <ControlledSelect<EndClient>
                  label={t('endClient')}
                  name="endclientId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="end-clients"
                  option={{ label: row => row.name, value: row => row.id }}
                  onChange={value => setInputValue(Number(value))}
                  isRequired
                />
              )}
              {inputType === 'businesspartnerId' && (
                <ControlledSelect
                  label={t('businessPartner')}
                  name="businesspartnersId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="business-partners"
                  option={{ label: row => row.name, value: row => row.id }}
                  onChange={value => setInputValue(Number(value))}
                  isRequired
                />
              )}
              {(inputType === 'enterpriseRootId' || inputType === 'endclientId') && (
                <ControlledSelect
                  label={t('enterpriseRoot')}
                  name="enterpriseRootId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="enterprise-roots"
                  option={{ label: row => row.name, value: row => row.id }}
                  onChange={value => setInputValue(Number(value))}
                  isRequired
                />
              )}
              <ControlledSelect<OrganizationUnit>
                label={t('organizationUnit')}
                name="ouUnitId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="organisational-units"
                filter={
                  inputType && inputValue
                    ? {
                        [inputType]: inputValue,
                      }
                    : {}
                }
                option={{ label: row => row.name, value: row => row.id }}
                disabled={!inputType || inputValue === 0}
                isHidden
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
