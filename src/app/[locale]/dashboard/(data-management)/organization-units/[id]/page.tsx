'use client'

import { useTranslations } from 'next-intl'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'
import { getBreadcrumbItems } from '@/components/breadcrumbs/helper'
import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { useOrganizationUnit } from '@/services/swr/use-organization-unit'
import { safeRender } from '@/utils/safeRender'

export default function OrganizationUnitDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.organizationUnits')

  const { data, isLoading } = useOrganizationUnit(params.id)

  const organizationUnitInfoFields = [
    { label: t('addressName'), value: safeRender(data, 'primaryAddress.addressName') },
    { label: t('streetName'), value: safeRender(data, 'primaryAddress.streetname') },
    { label: t('houseNumberSuffix'), value: safeRender(data, 'primaryAddress.housenumberSuffix') },
    { label: t('houseNumber'), value: safeRender(data, 'primaryAddress.housenumber') },
    { label: t('apartmentNumber'), value: safeRender(data, 'primaryAddress.appartmentNumber') },
    { label: t('area'), value: safeRender(data, 'primaryAddress.area') },
    { label: t('county'), value: safeRender(data, 'primaryAddress.county') },
    { label: t('city'), value: safeRender(data, 'primaryAddress.city') },
    { label: t('country'), value: safeRender(data, 'primaryAddress.country.name') },
    { label: t('postalCode'), value: safeRender(data, 'primaryAddress.postalcode') },
    { label: t('latitude'), value: safeRender(data, 'primaryAddress.lat') },
    { label: t('longitude'), value: safeRender(data, 'primaryAddress.lng') },
    { label: t('googleAddressId'), value: safeRender(data, 'primaryAddress.googleAddressId') },
  ]

  const tabs = [
    {
      eventKey: 'organizationUnitInfo',
      title: t('organizationUnitInfo'),
      content: (
        <FieldTextView
          fields={organizationUnitInfoFields}
          isLoading={isLoading}
          translation="dataManagement.organizationUnits"
          title={t('organizationUnitInfo')}
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

      <PageTitle title={data?.name || ''} />
      <DynamicTabs tabs={tabs} defaultActiveKey="organizationUnitInfo" />
    </>
  )
}
