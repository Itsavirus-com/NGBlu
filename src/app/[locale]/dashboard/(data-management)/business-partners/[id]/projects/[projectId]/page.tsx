'use client'

import { useTranslations } from 'next-intl'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'
import { getBreadcrumbItems } from '@/components/breadcrumbs/helper'
import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { useBusinessPartnerProject } from '@/services/swr/use-business-partner-project'
import { safeRender } from '@/utils/safeRender'

export default function BusinessPartnerProjectDetails({
  params,
}: {
  params: { id: number; projectId: number }
}) {
  const t = useTranslations('dataManagement.businessPartners.projects')

  const { data, isLoading } = useBusinessPartnerProject(params.id, params.projectId)

  const projectFields = [
    { label: t('projectName'), value: safeRender(data, 'project.projectName'), lg: 6 },
    { label: t('projectType'), value: safeRender(data, 'project.projectType.projectType'), lg: 6 },
    {
      label: t('projectInfo'),
      value: safeRender(data, 'project.projectInfo.projectInfo'),
      md: 12,
      lg: 12,
    },
  ]

  const tabs = [
    {
      eventKey: 'projectInfo',
      title: t('projectInfo'),
      content: (
        <FieldTextView
          fields={projectFields}
          isLoading={isLoading}
          translation="dataManagement.businessPartners.projects"
          title={t('projectInfo')}
        />
      ),
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
