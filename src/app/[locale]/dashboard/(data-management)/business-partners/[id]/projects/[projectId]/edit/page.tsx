'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import BusinessPartnerProjectForm from '../../../_components/BusinessPartnerProjectForm'
import useBusinessPartnerProjectForm from '../../../_hooks/business-partner-project-form.hook'

export default function UpdateBusinessPartnerProject({
  params,
}: {
  params: { id: string; projectId: string }
}) {
  const t = useTranslations('dataManagement.businessPartners.projects')

  const { methods, onSubmit, isSubmitting } = useBusinessPartnerProjectForm(
    Number(params.id),
    Number(params.projectId)
  )

  return (
    <>
      <PageTitle title={t('updateProject')} />
      <BusinessPartnerProjectForm
        methods={methods}
        onSubmit={onSubmit}
        id={Number(params.id)}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
