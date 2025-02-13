'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import useBusinessPartnerUserForm from '../../../_hooks/business-partner-user-form.hook'
import BusinessPartnerUserForm from '../../_components/BusinessPartnerUserForm'

export default function UpdateBusinessPartnerUser({
  params,
}: {
  params: { id: string; userId: string }
}) {
  const t = useTranslations('dataManagement.businessPartners.users')

  const { methods, onSubmit, isLoading } = useBusinessPartnerUserForm(
    Number(params.id),
    Number(params.userId)
  )

  return (
    <>
      <PageTitle title={t('updateUser')} />
      {isLoading ? <Loading /> : <BusinessPartnerUserForm methods={methods} onSubmit={onSubmit} />}
    </>
  )
}
