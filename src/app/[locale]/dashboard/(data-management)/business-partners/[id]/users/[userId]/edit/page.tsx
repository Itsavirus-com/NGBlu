'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import BusinessPartnerUserForm from '../../../_components/BusinessPartnerUserForm'
import useBusinessPartnerUserForm from '../../../_hooks/business-partner-user-form.hook'

export default function UpdateBusinessPartnerUser({
  params,
}: {
  params: { id: string; userId: string }
}) {
  const t = useTranslations('dataManagement.businessPartners.users')

  const { methods, onSubmit, isSubmitting } = useBusinessPartnerUserForm(
    Number(params.id),
    Number(params.userId)
  )

  return (
    <>
      <PageTitle title={t('updateUser')} />
      <BusinessPartnerUserForm
        methods={methods}
        onSubmit={onSubmit}
        id={Number(params.id)}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
