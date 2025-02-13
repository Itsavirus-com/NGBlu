'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useEndClientProjectForm from '../../_hooks/end-client-project-form.hook'
import EndClientProjectForm from '../_components/EndClientProjectForm'

export default function NewEndClientProject({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.endClients.projects')

  const { methods, onSubmit } = useEndClientProjectForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('newProject')} />
      <EndClientProjectForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
