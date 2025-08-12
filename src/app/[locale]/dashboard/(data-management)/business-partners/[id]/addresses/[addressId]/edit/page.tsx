'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import BusinessPartnerAddressForm from '../../../_components/BusinessPartnerAddressForm'
import useBusinessPartnerAddressForm from '../../../_hooks/business-partner-address-form.hook'

export default function UpdateBusinessPartnerAddress({
  params,
}: {
  params: { id: string; addressId: string }
}) {
  const t = useTranslations('dataManagement.businessPartners.addresses')

  const { methods, onSubmit, isSubmitting } = useBusinessPartnerAddressForm(
    Number(params.id),
    Number(params.addressId)
  )

  return (
    <>
      <PageTitle title={t('updateAddress')} />
      <BusinessPartnerAddressForm
        methods={methods}
        onSubmit={onSubmit}
        id={Number(params.id)}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
