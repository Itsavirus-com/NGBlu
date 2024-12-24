'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'
import { getBreadcrumbItems } from '@/components/breadcrumbs/helper'
import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { useEnterpriseRootProject } from '@/services/swr/use-enterprise-root-project'

export default function EnterpriseRootProjectDetails({
  params,
}: {
  params: { id: number; projectId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.projects')

  const { data, isLoading } = useEnterpriseRootProject(params.id, params.projectId)

  return (
    <>
      <div className="app-container">
        <Breadcrumbs items={getBreadcrumbItems(data)} />
      </div>

      <PageTitle title={t('title')} />

      <Page title={t('address')}>
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('addressName')}
            value={data?.enterpriseRootAddresses.addressName}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('streetName')}
            value={data?.enterpriseRootAddresses.streetname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumberSuffix')}
            value={data?.enterpriseRootAddresses.housenumberSuffix}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumber')}
            value={data?.enterpriseRootAddresses.housenumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('apartmentNumber')}
            value={data?.enterpriseRootAddresses.appartmentNumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('area')}
            value={data?.enterpriseRootAddresses.area}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('county')}
            value={data?.enterpriseRootAddresses.county}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('city')}
            value={data?.enterpriseRootAddresses.city}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('country')}
            value={data?.enterpriseRootAddresses.country?.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('postalCode')}
            value={data?.enterpriseRootAddresses.postalcode}
          />
        </Row>
      </Page>

      <Page title={t('project')} className="mt-4">
        <Row>
          <TextView
            lg={6}
            className="my-3"
            isLoading={isLoading}
            label={t('projectName')}
            value={data?.project.projectName}
          />
          <TextView
            lg={6}
            className="my-3"
            isLoading={isLoading}
            label={t('projectType')}
            value={data?.project.projectType?.projectType}
          />
          <TextView
            md={12}
            lg={12}
            className="my-3"
            isLoading={isLoading}
            label={t('projectInfo')}
            value={data?.project.projectInfo?.projectInfo}
          />
        </Row>
      </Page>
    </>
  )
}
