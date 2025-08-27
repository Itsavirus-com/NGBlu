'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import EndClientProjectForm from '../../../_components/EndClientProjectForm'
import useEndClientProjectForm from '../../../_hooks/end-client-project-form.hook'

export default function UpdateEndClientProject({
  params,
}: {
  params: { id: string; projectId: string }
}) {
  const t = useTranslations('dataManagement.endClients.projects')

  const { methods, onSubmit, isSubmitting } = useEndClientProjectForm(
    Number(params.id),
    Number(params.projectId)
  )

  return (
    <>
      <PageTitle title={t('updateProject')} />
      <EndClientProjectForm
        methods={methods}
        onSubmit={onSubmit}
        id={Number(params.id)}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
