'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import useEndClientProjectForm from '../../../_hooks/end-client-project-form.hook'
import EndClientProjectForm from '../../_components/EndClientProjectForm'

export default function UpdateEndClientProject({
  params,
}: {
  params: { id: string; projectId: string }
}) {
  const t = useTranslations('dataManagement.endClients.projects')

  const { methods, onSubmit, isLoading } = useEndClientProjectForm(
    Number(params.id),
    Number(params.projectId)
  )

  return (
    <>
      <PageTitle title={t('updateProject')} />
      {isLoading ? <Loading /> : <EndClientProjectForm methods={methods} onSubmit={onSubmit} />}
    </>
  )
}
