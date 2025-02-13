'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import { BusinessPartnerForm } from '../../_components/BusinessPartnerForm'
import useBusinessPartnerForm from '../../_hooks/business-partner-form.hook'

export default function UpdateBusinessPartner({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.businessPartners')

  const { methods, onSubmit, isLoading, enterpriseRootIdValue } = useBusinessPartnerForm(
    Number(params.id)
  )

  return (
    <>
      <PageTitle title={t('updateBusinessPartner')} />
      {isLoading ? (
        <Loading />
      ) : (
        <BusinessPartnerForm
          methods={methods}
          onSubmit={onSubmit}
          enterpriseRootIdValue={enterpriseRootIdValue}
        />
      )}
    </>
  )
}
