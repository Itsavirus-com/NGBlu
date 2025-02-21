'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import BusinessPartnerTypeForm from '../../_components/BusinessPartnerTypeForm'
import useBusinessPartnerTypeForm from '../../_hooks/business-partner-type-form.hook'

export default function UpdateBusinessPartnerType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.businessPartnerTypes')
  const { methods, onSubmit, isSubmitting, isLoading } = useBusinessPartnerTypeForm(
    Number(params.id)
  )

  return (
    <>
      <PageTitle title={t('updateBusinessPartnerType')} />
      {isLoading ? (
        <Loading />
      ) : (
        <BusinessPartnerTypeForm
          methods={methods}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  )
}
