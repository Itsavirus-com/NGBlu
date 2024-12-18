'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { Address } from '@/services/swr/models/address.type'
import { BusinessPartnerType } from '@/services/swr/models/business-partner-type.type'
import { BusinessPartner } from '@/services/swr/models/business-partner.type'
import { Company } from '@/services/swr/models/company.type'
import { EnterpriseRoot } from '@/services/swr/models/enterprise-root-type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'

import useBusinessPartnerForm from '../../components/business-partner-form.hook'

export default function UpdateBusinessPartner({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.businessPartners')

  const { methods, onSubmit } = useBusinessPartnerForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateBusinessPartner')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('name')}
                name="name"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledSelect<BusinessPartnerType>
                label={t('businessPartnerType')}
                name="businesspartnerTypeId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="business-partners/types"
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect<Address>
                label={t('businessPartnersAddresses')}
                name="businesspartnersAddressesId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="addresses"
                option={{ label: row => row.addressName, value: row => row.id }}
              />
              <ControlledSelect<Company>
                label={t('company')}
                name="companyInfoId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="companies/infos"
                option={{ label: row => row.companyname, value: row => row.id }}
              />
              <ControlledSelect<EnterpriseRoot>
                label={t('enterpriseRoot')}
                name="enterpriseRootId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="enterprise-roots"
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect<OrganizationUnit>
                label={t('organisationalUnit')}
                name="ouUnit"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="organisational-units"
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect<BusinessPartner>
                label={t('parent')}
                name="id"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="business-partners"
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
