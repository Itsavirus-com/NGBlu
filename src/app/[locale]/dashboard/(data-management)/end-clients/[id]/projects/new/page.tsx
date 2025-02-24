'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import EndClientProjectForm from '../../_components/EndClientProjectForm'
import useEndClientProjectForm from '../../_hooks/end-client-project-form.hook'

export default function NewEndClientProject({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.endClients.projects')

  const { methods, onSubmit, isSubmitting } = useEndClientProjectForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('newProject')} />
      <EndClientProjectForm
        methods={methods}
        onSubmit={onSubmit}
        id={Number(params.id)}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
