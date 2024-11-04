'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { Address } from '@/services/swr/models/address.type'
import { CompanyStatus } from '@/services/swr/models/company-status.type'

import useCompanyForm from '../../components/company-form.hook'

export default function UpdateCompany({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.companies')

  const { methods, onSubmit } = useCompanyForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateCompany')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('name')}
                name="companyname"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledSelect<CompanyStatus>
                label={t('status')}
                name="companyStatusId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="companies/statuses"
                option={{ label: row => row.status, value: row => row.id }}
              />
              <ControlledSelect<Address>
                label={t('visitAddress')}
                name="visitAddressId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="addresses"
                option={{ label: row => row.addressName, value: row => row.id }}
              />
              <ControlledSelect<Address>
                label={t('postalAddress')}
                name="postalAddressId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="addresses"
                option={{ label: row => row.addressName, value: row => row.id }}
              />
              <ControlledSelect<Address>
                label={t('invoiceAddress')}
                name="invoiceAddressId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="addresses"
                option={{ label: row => row.addressName, value: row => row.id }}
              />
              <ControlledSelect<Address>
                label={t('legalAddress')}
                name="legalAddressId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="addresses"
                option={{ label: row => row.addressName, value: row => row.id }}
              />
              <ControlledInput
                label={t('kvkNumber')}
                name="chamberOfCommerceId"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledInput
                label={t('vatNumber')}
                name="vatNumber"
                containerClass="mb-3"
                className="form-control-solid"
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
