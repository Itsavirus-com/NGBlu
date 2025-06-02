'use client'

import { useTranslations } from 'next-intl'

import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs'
import { getBreadcrumbItems } from '@/components/breadcrumbs/helper'
import { DynamicTabs } from '@/components/dynamic-tabs/DynamicTabs'
import { PageTitle } from '@/components/page-title'
import { FieldTextView } from '@/components/view/field-text-view/FieldTextView'
import { useBusinessPartnerProjectNamespace } from '@/services/swr/use-business-partner'
import { useBusinessPartnerProject } from '@/services/swr/use-business-partner-project'
import { safeRender } from '@/utils/safeRender'

export default function BusinessPartnerProjectDetails({
  params,
}: {
  params: { id: number; projectId: number }
}) {
  const t = useTranslations('dataManagement.businessPartners.projects')

  const { data, isLoading } = useBusinessPartnerProject(params.id, params.projectId)
  const { data: projectNamespaceData } = useBusinessPartnerProjectNamespace(
    params.id,
    params.projectId
  )

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
      title: t('info'),
      content: (
        <FieldTextView
          fields={projectFields}
          isLoading={isLoading}
          translation="dataManagement.businessPartners.projects"
        />
      ),
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <div className="app-container">
        <Breadcrumbs items={getBreadcrumbItems({ namespace: projectNamespaceData })} />
      </div>
      <PageTitle title={`${t('projectInfo')}: ${safeRender(data, 'project.projectName')}`} />
      <DynamicTabs tabs={tabs} defaultActiveKey="projectInfo" />
    </>
  )
}
