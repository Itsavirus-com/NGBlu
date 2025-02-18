'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import BusinessPartnerCustomerForm from '../../_components/BusinessPartnerCustomerForm'
import useBusinessPartnerCustomerForm from '../../_hooks/business-partner-customer-form.hook'

export default function NewBusinessPartnerCustomer({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.businessPartners.customers')

  const { methods, onSubmit } = useBusinessPartnerCustomerForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('newCustomer')} />
      <BusinessPartnerCustomerForm methods={methods} onSubmit={onSubmit} id={Number(params.id)} />
    </>
  )
}
