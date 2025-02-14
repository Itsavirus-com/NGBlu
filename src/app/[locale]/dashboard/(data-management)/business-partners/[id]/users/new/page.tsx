'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useBusinessPartnerUserForm from '../../_hooks/business-partner-user-form.hook'
import BusinessPartnerUserForm from '../_components/BusinessPartnerUserForm'

export default function NewBusinessPartnerUser({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.businessPartners.users')

  const { methods, onSubmit } = useBusinessPartnerUserForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('newUser')} />
      <BusinessPartnerUserForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
