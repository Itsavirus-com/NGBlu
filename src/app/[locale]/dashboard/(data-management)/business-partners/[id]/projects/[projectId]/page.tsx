'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'
import { getBreadcrumbItems } from '@/components/breadcrumbs/helper'
import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { useBusinessPartnerProject } from '@/services/swr/use-business-partner-project'

export default function BusinessPartnerProjectDetails({
  params,
}: {
  params: { id: number; projectId: number }
}) {
  const t = useTranslations('dataManagement.businessPartners.projects')

  const { data, isLoading } = useBusinessPartnerProject(params.id, params.projectId)

  return (
    <>
      <div className="app-container">
        <Breadcrumbs items={getBreadcrumbItems(data)} />
      </div>

      <PageTitle title={t('title')} />

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
