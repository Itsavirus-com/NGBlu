'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'
import { AddressType } from '@/services/swr/models/address-type.type'
import { Address } from '@/services/swr/models/address.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'

import useBusinessPartnerAddressForm from '../../../_hooks/business-partner-address-form.hook'

export default function UpdateBusinessPartnerAddress({
  params,
}: {
  params: { id: string; addressId: string }
}) {
  const t = useTranslations('dataManagement.businessPartners.addresses')

  const { methods, onSubmit, isLoading } = useBusinessPartnerAddressForm(
    Number(params.id),
    Number(params.addressId)
  )

  return (
    <>
      <PageTitle title={t('updateAddress')} />
      {isLoading ? (
        <Loading />
      ) : (
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="app-container container-fluid">
            <Card>
              <CardBody>
                <ControlledSelect<Address>
                  label={t('address')}
                  name="addressId"
                  containerClass="mb-3"
                  apiPath={'addresses'}
                  option={{ label: row => row.addressName, value: row => row.id }}
                  isRequired
                />
                <ControlledSelect<AddressType>
                  label={t('addressType')}
                  name="addressTypeId"
                  containerClass="mb-3"
                  apiPath={'addresses/types'}
                  option={{ label: row => row.addressType, value: row => row.id }}
                  isRequired
                />
                <ControlledSelect<OrganizationUnit>
                  label={t('organisationalUnit')}
                  name="ouUnitId"
                  containerClass="mb-3"
                  apiPath={'organisational-units'}
                  option={{ label: row => row.name, value: row => row.id }}
                  filter={{
                    businesspartnerId: params.id,
                  }}
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
