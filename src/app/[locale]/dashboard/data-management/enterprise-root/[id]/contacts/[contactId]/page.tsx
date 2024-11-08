'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { useEnterpriseRootContact } from '@/services/swr/use-enterprise-root-contact'

export default function EnterpriseRootContactDetails({
  params,
}: {
  params: { id: number; contactId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.contacts')

  const { data, isLoading } = useEnterpriseRootContact(params.id, params.contactId)

  return (
    <>
      <PageTitle title={t('title')} />

      <Page>
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('contactInfo')}
            value={data?.contactInfo.contactInfo}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('contactInfo')}
            value={data?.contactInfo.contactType.contactType}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('responsibility')}
            value={data?.responsibility.responsibility}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('person')}
            value={data?.personId}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('enterpriseRoot')}
            value={data?.enterpriseRootId}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('organisationUnit')}
            value={data?.ouUnitId}
          />
        </Row>
      </Page>
    </>
  )
}
