'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { useEnterpriseRoot } from '@/services/swr/use-enterprise-root'

export default function EnterpriseRootDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.enterpriseRoots')

  const { data, isLoading } = useEnterpriseRoot(params.id)

  return (
    <>
      <PageTitle title={data?.name || ''} />

      <Page>
        <Row>
          <TextView className="my-3" isLoading={isLoading} label={t('name')} value={data?.name} />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('addressesCount')}
            value={data?.addressesCount}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('contactsCount')}
            value={data?.contactsCount}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('usersCount')}
            value={data?.usersCount}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('projectsCount')}
            value={data?.projectsCount}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('customersCount')}
            value={data?.customersCount}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('businessPartnersCount')}
            value={data?.businessPartnersCount}
          />
        </Row>
      </Page>
    </>
  )
}
