'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { useEndClientContact } from '@/services/swr/use-end-client-contact'

export default function EndClientContactDetails({
  params,
}: {
  params: { id: number; contactId: number }
}) {
  const t = useTranslations('dataManagement.endClients.contacts')

  const { data, isLoading } = useEndClientContact(params.id, params.contactId)

  return (
    <>
      <PageTitle title={data?.contactInfo.contactInfo || ''} />

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
        </Row>
      </Page>
    </>
  )
}
