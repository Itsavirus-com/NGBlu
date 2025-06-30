'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'
import { ControlledSelect } from '@/components/forms/controlled-select/ControlledSelect'
import { FormButtons } from '@/components/forms/form-buttons/FormButtons'
import { FormProvider } from '@/components/forms/form-provider'
import { Address } from '@/services/swr/models/address.type'
import { BusinessPartnerType } from '@/services/swr/models/business-partner-type.type'
import { BusinessPartner } from '@/services/swr/models/business-partner.type'
import { Company } from '@/services/swr/models/company.type'
import { EnterpriseRoot } from '@/services/swr/models/enterprise-root-type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'

interface BusinessPartnerFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  enterpriseRootIdValue: number
  isSubmitting: boolean
}

export function BusinessPartnerForm({
  methods,
  onSubmit,
  enterpriseRootIdValue,
  isSubmitting,
}: BusinessPartnerFormProps) {
  const t = useTranslations('dataManagement.businessPartners')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <Row>
              <Col>
                <ControlledSelect<EnterpriseRoot>
                  label={t('enterpriseRoot')}
                  name="enterpriseRootId"
                  containerClass="mb-3"
                  apiPath="enterprise-roots"
                  option={{ label: row => row.name, value: row => row.id }}
                  onChange={() => {
                    methods.setValue('ouUnitId', 0)
                  }}
                  isRequired
                />
                <ControlledInput
                  label={t('name')}
                  name="name"
                  containerClass="mb-3"
                  className="form-control-solid"
                  isRequired
                />
                <ControlledSelect<Company>
                  label={t('companyInfo')}
                  name="companyInfoId"
                  containerClass="mb-3"
                  apiPath="companies/infos"
                  option={{ label: row => row.companyname, value: row => row.id }}
                  isRequired
                />

                <ControlledSelect<OrganizationUnit>
                  label={t('organisationalUnit')}
                  name="ouUnitId"
                  containerClass="mb-3"
                  apiPath="organisational-units"
                  option={{ label: row => row.name, value: row => row.id }}
                  filter={{ enterpriseRootId: enterpriseRootIdValue }}
                  isHidden
                  disabled={!enterpriseRootIdValue}
                />
              </Col>

              <Col>
                <ControlledSelect<BusinessPartner>
                  label={t('parent')}
                  name="parentId"
                  containerClass="mb-3"
                  apiPath="business-partners"
                  option={{ label: row => row.name, value: row => row.id }}
                />
                <ControlledSelect<BusinessPartnerType>
                  label={t('businessPartnerType')}
                  name="businesspartnerTypeId"
                  containerClass="mb-3"
                  apiPath="business-partners/types"
                  option={{ label: row => row.name, value: row => row.id }}
                  isRequired
                />
                <ControlledSelect<Address>
                  label={t('businessPartnersAddresses')}
                  name="businesspartnersAddressesId"
                  containerClass="mb-3"
                  apiPath="addresses"
                  option={{ label: row => row.addressName, value: row => row.id }}
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
