'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { Address } from '@/services/swr/models/address.type'
import { Company } from '@/services/swr/models/company.type'
import { EndClientStatus } from '@/services/swr/models/end-client-status.type'
import { EndClientType } from '@/services/swr/models/end-client-type.type'

interface EndClientFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  isDisplayCompanyInfo: boolean
  setIsDisplayCompanyInfo: (value: boolean) => void
}

export default function EndClientForm({
  methods,
  onSubmit,
  isDisplayCompanyInfo,
  setIsDisplayCompanyInfo,
}: EndClientFormProps) {
  const t = useTranslations('dataManagement.endClients')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <Row>
              <Col>
                <ControlledInput
                  label={t('name')}
                  name="name"
                  containerClass="mb-3"
                  className="form-control-solid"
                  isRequired
                />
                <ControlledSelect<Address>
                  label={t('address')}
                  name="locationAddressId"
                  containerClass="mb-3"
                  apiPath="addresses"
                  option={{ label: row => row.addressName, value: row => row.id }}
                  isRequired
                />
                {isDisplayCompanyInfo && (
                  <ControlledSelect<Company>
                    label={t('companyInfo')}
                    name="companyInfoId"
                    containerClass="mb-3"
                    apiPath="companies/infos"
                    option={{ label: row => row.companyname, value: row => row.id }}
                  />
                )}
              </Col>
              <Col>
                <ControlledSelect<EndClientType>
                  label={t('type')}
                  name="typeId"
                  containerClass="mb-3"
                  apiPath="end-clients/types"
                  option={{ label: row => row.type, value: row => row.id }}
                  onChange={(_value, optionData) => {
                    setIsDisplayCompanyInfo(optionData?.type === 'Corporate')
                  }}
                  isRequired
                />
                <ControlledSelect<EndClientStatus>
                  label={t('status')}
                  name="statusId"
                  containerClass="mb-3"
                  apiPath="end-clients/statuses"
                  option={{ label: row => row.status, value: row => row.id }}
                  isRequired
                />
              </Col>
            </Row>

            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
