'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { useEndClientProject } from '@/services/swr/use-end-client-project'

import { ProjectAddress } from './components/project-address'
import { ProjectInfo } from './components/project-info'

export default function EndClientProjectDetails({
  params,
}: {
  params: { id: number; projectId: number }
}) {
  const t = useTranslations('dataManagement.endClients.projects')

  const { data, isLoading } = useEndClientProject(params.id, params.projectId)

  const tabs = [
    {
      eventKey: 'projectInfo',
      title: t('projectInfo'),
      content: <ProjectInfo data={data} isLoading={isLoading} />,
      condition: Boolean(data),
    },
    {
      eventKey: 'address',
      title: t('address'),
      content: <ProjectAddress data={data} isLoading={isLoading} />,
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <PageTitle title={t('title')} />
      <DynamicTabs tabs={tabs} defaultActiveKey="projectInfo" />
    </>
  )
}
