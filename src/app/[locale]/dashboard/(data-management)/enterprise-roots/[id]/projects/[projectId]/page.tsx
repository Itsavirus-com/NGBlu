'use client'

import { useTranslations } from 'next-intl'

import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs'
import { getBreadcrumbItems } from '@/components/breadcrumbs/helper'
import { DynamicTabs } from '@/components/dynamic-tabs/DynamicTabs'
import { PageTitle } from '@/components/page-title'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { useEnterpriseRootProjectNamespace } from '@/services/swr/use-enterprise-root'
import { useEnterpriseRootProject } from '@/services/swr/use-enterprise-root-project'
import { safeRender } from '@/utils/safeRender'

export default function EnterpriseRootProjectDetails({
  params,
}: {
  params: { id: number; projectId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.projects')

  const { data, isLoading } = useEnterpriseRootProject(params.id, params.projectId)
  const { data: projectNamespaceData } = useEnterpriseRootProjectNamespace(
    params.id,
    params.projectId
  )

  const projectInfoFields = [
    { label: t('projectName'), value: safeRender(data, 'project.projectName'), lg: 6 },
    { label: t('projectType'), value: safeRender(data, 'project.projectType.projectType'), lg: 6 },
    {
      label: t('projectInfo'),
      value: safeRender(data, 'project.projectInfo.projectInfo'),
      md: 12,
      lg: 12,
    },
  ]

  const addressFields = [
    { label: t('addressName'), value: safeRender(data, 'enterpriseRootAddresses.addressName') },
    { label: t('streetName'), value: safeRender(data, 'enterpriseRootAddresses.streetname') },
    {
      label: t('houseNumberSuffix'),
      value: safeRender(data, 'enterpriseRootAddresses.housenumberSuffix'),
    },
    { label: t('houseNumber'), value: safeRender(data, 'enterpriseRootAddresses.housenumber') },
    {
      label: t('apartmentNumber'),
      value: safeRender(data, 'enterpriseRootAddresses.appartmentNumber'),
    },
    { label: t('area'), value: safeRender(data, 'enterpriseRootAddresses.area') },
    { label: t('county'), value: safeRender(data, 'enterpriseRootAddresses.county') },
    { label: t('city'), value: safeRender(data, 'enterpriseRootAddresses.city') },
    { label: t('country'), value: safeRender(data, 'enterpriseRootAddresses.country.name') },
    { label: t('postalCode'), value: safeRender(data, 'enterpriseRootAddresses.postalcode') },
  ]

  const tabs = [
    {
      eventKey: 'projectInfo',
      title: t('info'),
      content: (
        <FieldTextView
          fields={projectInfoFields}
          isLoading={isLoading}
          translation="dataManagement.enterpriseRoots.projects"
        />
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'address',
      title: t('address'),
      content: (
        <FieldTextView
          fields={addressFields}
          isLoading={isLoading}
          translation="dataManagement.enterpriseRoots.projects"
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
      <PageTitle title={`${t('project')}: ${safeRender(data, 'project.projectName')}`} />
      <DynamicTabs tabs={tabs} defaultActiveKey="projectInfo" />
    </>
  )
}
