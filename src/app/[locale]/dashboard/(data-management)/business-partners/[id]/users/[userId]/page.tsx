'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { useBusinessPartnerUser } from '@/services/swr/use-business-partner-user'

export default function BusinessPartnerUserDetails({
  params,
}: {
  params: { id: number; userId: number }
}) {
  const t = useTranslations('dataManagement.businessPartners.users')

  const { data, isLoading } = useBusinessPartnerUser(params.id, params.userId)

  return (
    <>
      <PageTitle title={t('title')} />

      <Page title={t('businessPartnerUser')}>
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('displayName')}
            value={data?.user.displayName}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('email')}
            value={data?.user.email}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('lastLogin')}
            value={data?.user.lastLogin || '-'}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('blocked')}
            value={data?.user.blockedAt ? t('yes') : t('no')}
          />
        </Row>
      </Page>
    </>
  )
}
