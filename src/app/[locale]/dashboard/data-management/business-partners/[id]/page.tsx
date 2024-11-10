'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { useBusinessPartner } from '@/services/swr/use-business-partner'

export default function BusinessPartnerDetails({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.businessPartners')

  const { data, isLoading } = useBusinessPartner(Number(params.id))

  return (
    <>
      <PageTitle title={data?.name || ''} />

      <Page>
        <Row>
          <TextView className="my-3" isLoading={isLoading} label={t('name')} value={data?.name} />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('company')}
            value={data?.companyInfo.companyname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('type')}
            value={data?.businessPartnerType.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('addressCount')}
            value={data?.businessPartnerAddressesCount || 0}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('contactCount')}
            value={data?.businessPartnerContactsCount || 0}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('customerCount')}
            value={data?.businessPartnerCustomersCount || 0}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('projectCount')}
            value={data?.businessPartnerProjectsCount || 0}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('userCount')}
            value={data?.businessPartnerUsersCount || 0}
          />
        </Row>
      </Page>
    </>
  )
}
