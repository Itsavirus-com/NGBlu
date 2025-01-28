'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody, Col, Row } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'
import { Address } from '@/services/swr/models/address.type'
import { CompanyStatus } from '@/services/swr/models/company-status.type'
import { Company } from '@/services/swr/models/company.type'

import useCompanyForm from '../../_hooks/company-form.hook'

export default function UpdateCompany({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.companies')

  const { methods, onSubmit, isLoading } = useCompanyForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateCompany')} />
      {isLoading ? (
        <Loading />
      ) : (
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="app-container container-fluid">
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <ControlledInput
                      label={t('name')}
                      name="companyname"
                      containerClass="mb-3"
                      className="form-control-solid"
                      isRequired
                    />
                    <ControlledSelect<Address>
                      label={t('legalAddress')}
                      name="legalAddressId"
                      containerClass="mb-3"
                      apiPath="addresses"
                      option={{ label: row => row.addressName, value: row => row.id }}
                      isRequired
                    />
                    <ControlledSelect<Address>
                      label={t('postalAddress')}
                      name="postalAddressId"
                      containerClass="mb-3"
                      apiPath="addresses"
                      option={{ label: row => row.addressName, value: row => row.id }}
                    />
                    <ControlledInput
                      label={t('kvkNumber')}
                      name="chamberOfCommerceId"
                      containerClass="mb-3"
                      className="form-control-solid"
                      isRequired
                    />
                    <ControlledSelect<Company>
                      label={t('origin')}
                      name="originId"
                      containerClass="mb-3"
                      apiPath="/companies/infos"
                      option={{ label: row => row.companyname, value: row => row.id }}
                    />
                  </Col>
                  <Col>
                    <ControlledSelect<CompanyStatus>
                      label={t('status')}
                      name="companyStatusId"
                      containerClass="mb-3"
                      apiPath="companies/statuses"
                      option={{ label: row => row.status, value: row => row.id }}
                      isRequired
                    />
                    <ControlledSelect<Address>
                      label={t('visitAddress')}
                      name="visitAddressId"
                      containerClass="mb-3"
                      apiPath="addresses"
                      option={{ label: row => row.addressName, value: row => row.id }}
                      isRequired
                    />
                    <ControlledSelect<Address>
                      label={t('invoiceAddress')}
                      name="invoiceAddressId"
                      containerClass="mb-3"
                      apiPath="addresses"
                      option={{ label: row => row.addressName, value: row => row.id }}
                      isRequired
                    />
                    <ControlledInput
                      label={t('vatNumber')}
                      name="vatNumber"
                      containerClass="mb-3"
                      className="form-control-solid"
                    />
                  </Col>
                </Row>

                <FormButtons />
              </CardBody>
            </Card>
          </div>
        </FormProvider>
      )}
    </>
  )
}
