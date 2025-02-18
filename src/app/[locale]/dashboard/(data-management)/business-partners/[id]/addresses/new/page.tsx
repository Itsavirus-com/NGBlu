'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import BusinessPartnerAddressForm from '../../_components/BusinessPartnerAddressForm'
import useBusinessPartnerAddressForm from '../../_hooks/business-partner-address-form.hook'

export default function NewBusinessPartnerAddress({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.businessPartners.addresses')

  const { methods, onSubmit } = useBusinessPartnerAddressForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('newAddress')} />
      <BusinessPartnerAddressForm methods={methods} onSubmit={onSubmit} id={Number(params.id)} />
    </>
  )
}
