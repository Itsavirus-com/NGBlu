'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

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
      <PageTitle title={t('title')} />

      <Page title={t('address')}>
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('addressName')}
            value={data?.enterpriseRootAddresses.address.addressName}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('streetName')}
            value={data?.enterpriseRootAddresses.address.streetname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumberSuffix')}
            value={data?.enterpriseRootAddresses.address.housenumberSuffix}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumber')}
            value={data?.enterpriseRootAddresses.address.housenumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('apartmentNumber')}
            value={data?.enterpriseRootAddresses.address.appartmentNumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('area')}
            value={data?.enterpriseRootAddresses.address.area}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('county')}
            value={data?.enterpriseRootAddresses.address.county}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('city')}
            value={data?.enterpriseRootAddresses.address.city}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('country')}
            value={data?.enterpriseRootAddresses.address.country?.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('postalCode')}
            value={data?.enterpriseRootAddresses.address.postalcode}
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
