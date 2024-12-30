'use client'

import { useTranslations } from 'next-intl'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'
import { getBreadcrumbItems } from '@/components/breadcrumbs/helper'
import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { useBusinessPartnerProject } from '@/services/swr/use-business-partner-project'

import { ProjectInfo } from './components/project-info'

export default function BusinessPartnerProjectDetails({
  params,
}: {
  params: { id: number; projectId: number }
}) {
  const t = useTranslations('dataManagement.businessPartners.projects')

  const { data, isLoading } = useBusinessPartnerProject(params.id, params.projectId)

  const tabs = [
    {
      eventKey: 'projectInfo',
      title: t('projectInfo'),
      content: <ProjectInfo data={data} isLoading={isLoading} />,
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <div className="app-container">
        <Breadcrumbs items={getBreadcrumbItems(data)} />
      </div>
      <PageTitle title={t('title')} />
      <DynamicTabs tabs={tabs} defaultActiveKey="projectInfo" />
    </>
  )
}
