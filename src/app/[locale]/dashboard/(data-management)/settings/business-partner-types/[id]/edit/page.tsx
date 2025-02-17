'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import BusinessPartnerTypeForm from '../../_components/BusinessPartnerTypeForm'
import useBusinessPartnerTypeForm from '../../_hooks/business-partner-type-form.hook'

export default function UpdateBusinessPartnerType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.businessPartnerTypes')
  const { methods, onSubmit } = useBusinessPartnerTypeForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateBusinessPartnerType')} />
      <BusinessPartnerTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
