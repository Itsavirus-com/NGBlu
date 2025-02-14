'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import BusinessPartnerAddressForm from '../../../_components/BusinessPartnerAddressForm'
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
        <BusinessPartnerAddressForm methods={methods} onSubmit={onSubmit} />
      )}
    </>
  )
}
