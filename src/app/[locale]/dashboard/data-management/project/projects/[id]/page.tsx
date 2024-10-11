'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { useProject } from '@/services/swr/use-project'

export default function ProjectDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.projects')

  const { data, isLoading } = useProject(params.id)

  return (
    <>
      <PageTitle title={data?.projectName || ''} />

      <Page title={t('generalInfo')}>
        <Row>
          <TextView
            lg={6}
            className="my-3"
            isLoading={isLoading}
            label={t('projectName')}
            value={data?.projectName}
          />
          <TextView
            lg={6}
            className="my-3"
            isLoading={isLoading}
            label={t('projectType')}
            value={data?.projectType?.projectType}
          />
          <TextView
            md={12}
            lg={12}
            className="my-3"
            isLoading={isLoading}
            label={t('projectInfo')}
            value={data?.projectInfo?.projectInfo}
          />
        </Row>
      </Page>

      <Page className="mt-6" title={t('location')}>
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('addressName')}
            value={data?.address?.addressName}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('streetName')}
            value={data?.address?.streetname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumberSuffix')}
            value={data?.address?.housenumberSuffix}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumber')}
            value={data?.address?.housenumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('apartmentNumber')}
            value={data?.address?.appartmentNumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('area')}
            value={data?.address?.area}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('county')}
            value={data?.address?.county}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('city')}
            value={data?.address?.city}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('country')}
            value={data?.address?.country?.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('postalCode')}
            value={data?.address?.postalcode}
          />
        </Row>
      </Page>
    </>
  )
}
