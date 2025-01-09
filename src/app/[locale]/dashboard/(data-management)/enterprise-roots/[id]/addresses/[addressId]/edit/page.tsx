'use client'

import { useTranslations } from 'next-intl'
import { CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { AddressType } from '@/services/swr/models/address-type.type'
import { Address } from '@/services/swr/models/address.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'

import useEnterpriseRootAddressForm from '../../../_hooks/enterprise-root-address-form.hook'

export default function UpdateEnterpriseRoot({
  params,
}: {
  params: { addressId: string; id: string }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.addresses')

  const { methods, onSubmit } = useEnterpriseRootAddressForm(Number(params.addressId))

  return (
    <>
      <PageTitle title={t('updateAddress')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <CardBody>
            <ControlledSelect<Address>
              label={t('addressName')}
              name="addressId"
              containerClass="mb-3"
              className="form-control-solid"
              apiPath="addresses"
              option={{ label: row => row.addressName, value: row => row.id }}
              isRequired
            />
            <ControlledSelect<AddressType>
              label={t('addressType')}
              name="addressTypeId"
              containerClass="mb-3"
              className="form-control-solid"
              apiPath="addresses/types"
              option={{ label: row => row.addressType, value: row => row.id }}
              isRequired
            />
            <ControlledSelect<OrganizationUnit>
              label={t('organisationUnit')}
              name="ouUnitId"
              containerClass="mb-3"
              className="form-control-solid"
              apiPath="organisational-units"
              option={{ label: row => row.name, value: row => row.id }}
              filter={{ enterpriseRootId: params.id }}
              isRequired
            />

            <FormButtons />
          </CardBody>
        </div>
      </FormProvider>
    </>
  )
}
