'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import BusinessPartnerCustomerForm from '../../../_components/BusinessPartnerCustomerForm'
import useBusinessPartnerCustomerForm from '../../../_hooks/business-partner-customer-form.hook'

export default function UpdateBusinessPartnerCustomer({
  params,
}: {
  params: { id: string; customerId: string }
}) {
  const t = useTranslations('dataManagement.businessPartners.customers')

  const { methods, onSubmit, isLoading } = useBusinessPartnerCustomerForm(
    Number(params.id),
    Number(params.customerId)
  )

  return (
    <>
      <PageTitle title={t('updateCustomer')} />
      {isLoading ? (
        <Loading />
      ) : (
        <BusinessPartnerCustomerForm methods={methods} onSubmit={onSubmit} id={Number(params.id)} />
      )}
    </>
  )
}
