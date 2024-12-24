'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'
import { getBreadcrumbItems } from '@/components/breadcrumbs/helper'
import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { useOrganizationUnit } from '@/services/swr/use-organization-unit'

export default function OrganizationUnitDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.organizationUnits')

  const { data, isLoading } = useOrganizationUnit(params.id)

  return (
    <>
      <div className="app-container">
        <Breadcrumbs items={getBreadcrumbItems(data)} />
      </div>

      <PageTitle title={data?.name || ''} />

      <Page>
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('addressName')}
            value={data?.primaryAddress?.addressName}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('streetName')}
            value={data?.primaryAddress?.streetname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumberSuffix')}
            value={data?.primaryAddress?.housenumberSuffix}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumber')}
            value={data?.primaryAddress?.housenumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('apartmentNumber')}
            value={data?.primaryAddress?.appartmentNumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('area')}
            value={data?.primaryAddress?.area}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('county')}
            value={data?.primaryAddress?.county}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('city')}
            value={data?.primaryAddress?.city}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('country')}
            value={data?.primaryAddress?.country?.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('postalCode')}
            value={data?.primaryAddress?.postalcode}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('latitude')}
            value={data?.primaryAddress?.lat}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('longitude')}
            value={data?.primaryAddress?.lng}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('googleAddressId')}
            value={data?.primaryAddress?.googleAddressId}
          />
        </Row>
      </Page>
    </>
  )
}
