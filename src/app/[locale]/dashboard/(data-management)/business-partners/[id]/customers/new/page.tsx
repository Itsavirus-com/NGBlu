'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { BusinessPartnerAddress } from '@/services/swr/models/business-partner-address.type'
import { EndClient } from '@/services/swr/models/end-client.type'
import { EnterpriseRoot } from '@/services/swr/models/enterprise-root-type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'

import useBusinessPartnerCustomerForm from '../../components/business-partner-customer-form.hook'

export default function NewBusinessPartnerCustomer({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.businessPartners.customers')

  const { methods, onSubmit } = useBusinessPartnerCustomerForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('newCustomer')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledSelect<EndClient>
                label={t('endClient')}
                name="endclientId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath={'end-clients'}
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect<EnterpriseRoot>
                label={t('enterpriseRoot')}
                name="enterpriseRootId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath={`enterprise-roots`}
                option={{ label: row => row.name, value: row => row.id }}
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
