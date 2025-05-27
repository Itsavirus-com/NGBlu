'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/DynamicTabs'
import { PageTitle } from '@/components/page-title'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { useProject } from '@/services/swr/use-project'
import { safeRender } from '@/utils/safeRender'

export default function ProjectDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.projects')

  const { data, isLoading } = useProject(params.id)

  const generalInfoFields = [
    {
      label: t('projectName'),
      value: safeRender(data, 'projectName'),
      lg: 6,
    },
    {
      label: t('projectType'),
      value: safeRender(data, 'projectType.projectType'),
      lg: 6,
    },
    {
      label: t('projectInfo'),
      value: safeRender(data, 'projectInfo.projectInfo'),
      md: 12,
      lg: 12,
    },
  ]

  const locationFields = [
    { label: t('addressName'), value: safeRender(data, 'address.addressName') },
    { label: t('streetName'), value: safeRender(data, 'address.streetname') },
    { label: t('houseNumberSuffix'), value: safeRender(data, 'address.housenumberSuffix') },
    { label: t('houseNumber'), value: safeRender(data, 'address.housenumber') },
    { label: t('apartmentNumber'), value: safeRender(data, 'address.appartmentNumber') },
    { label: t('area'), value: safeRender(data, 'address.area') },
    { label: t('county'), value: safeRender(data, 'address.county') },
    { label: t('city'), value: safeRender(data, 'address.city') },
    { label: t('country'), value: safeRender(data, 'address.country.name') },
    { label: t('postalCode'), value: safeRender(data, 'address.postalcode') },
  ]

  const tabs = [
    {
      eventKey: 'generalInfo',
      title: t('generalInfo'),
      content: (
        <FieldTextView
          fields={generalInfoFields}
          isLoading={isLoading}
          translation="dataManagement.projects"
        />
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'location',
      title: t('location'),
      content: (
        <FieldTextView
          fields={locationFields}
          isLoading={isLoading}
          translation="dataManagement.projects"
        />
      ),
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <PageTitle title={`${t('project')}: ${safeRender(data, 'projectName')}`} />
      <DynamicTabs tabs={tabs} defaultActiveKey="generalInfo" />
    </>
  )
}
