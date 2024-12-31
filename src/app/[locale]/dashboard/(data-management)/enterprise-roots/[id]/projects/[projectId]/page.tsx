'use client'

import { useTranslations } from 'next-intl'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'
import { getBreadcrumbItems } from '@/components/breadcrumbs/helper'
import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { useEnterpriseRootProject } from '@/services/swr/use-enterprise-root-project'
import { safeRender } from '@/utils/safeRender'

export default function EnterpriseRootProjectDetails({
  params,
}: {
  params: { id: number; projectId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.projects')

  const { data, isLoading } = useEnterpriseRootProject(params.id, params.projectId)

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
      title: t('projectInfo'),
      content: (
        <FieldTextView
          fields={projectInfoFields}
          isLoading={isLoading}
          translation="dataManagement.enterpriseRoots.projects"
          title={t('projectInfo')}
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
          title={t('address')}
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
