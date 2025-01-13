'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { useEndClientProject } from '@/services/swr/use-end-client-project'
import { safeRender } from '@/utils/safeRender'

export default function EndClientProjectDetails({
  params,
}: {
  params: { id: number; projectId: number }
}) {
  const t = useTranslations('dataManagement.endClients.projects')

  const { data, isLoading } = useEndClientProject(params.id, params.projectId)

  const addressFields = [
    { label: t('addressName'), value: safeRender(data, 'endclientAddress.addressName') },
    { label: t('streetName'), value: safeRender(data, 'endclientAddress.streetname') },
    {
      label: t('houseNumberSuffix'),
      value: safeRender(data, 'endclientAddress.housenumberSuffix'),
    },
    { label: t('houseNumber'), value: safeRender(data, 'endclientAddress.housenumber') },
    { label: t('apartmentNumber'), value: safeRender(data, 'endclientAddress.appartmentNumber') },
    { label: t('area'), value: safeRender(data, 'endclientAddress.area') },
    { label: t('county'), value: safeRender(data, 'endclientAddress.county') },
    { label: t('city'), value: safeRender(data, 'endclientAddress.city') },
    { label: t('country'), value: safeRender(data, 'endclientAddress.country.name') },
    { label: t('postalCode'), value: safeRender(data, 'endclientAddress.postalcode') },
  ]

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

  const tabs = [
    {
      eventKey: 'projectInfo',
      title: t('info'),
      content: (
        <FieldTextView
          fields={projectInfoFields}
          isLoading={isLoading}
          translation="dataManagement.endClients.projects"
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
          translation="dataManagement.endClients.projects"
        />
      ),
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <PageTitle title={`${t('project')}: ${safeRender(data, 'project.projectName')}`} />
      <DynamicTabs tabs={tabs} defaultActiveKey="projectInfo" />
    </>
  )
}
