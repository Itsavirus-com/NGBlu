'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'
import { Address } from '@/services/swr/models/address.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'

import useEnterpriseRootForm from '../../_hooks/enterprise-root-form.hook'

export default function UpdateEnterpriseRoot({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.enterpriseRoots')

  const { methods, onSubmit, isLoading } = useEnterpriseRootForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateEnterpriseRoot')} />
      {isLoading ? (
        <Loading />
      ) : (
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
      )}
    </>
  )
}
