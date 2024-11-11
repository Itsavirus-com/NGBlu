'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { useCompany } from '@/services/swr/use-company'

import { Address } from './components/address'

export default function CompanyDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.companies')

  const { data, isLoading } = useCompany(params.id)

  return (
    <>
      <PageTitle title={data?.companyname || ''} />

      <Page title={t('generalInfo')}>
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('name')}
            value={data?.companyname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('status')}
            value={data?.companyStatus?.status}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('vatNumber')}
            value={data?.vatNumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('kvkNumber')}
            value={data?.chamberOfCommerceId}
          />
        </Row>
      </Page>

      {data?.legalAddress && (
        <Address title={t('legalAddress')} address={data.legalAddress} isLoading={isLoading} />
      )}

      {data?.visitAddress && (
        <Address title={t('visitAddress')} address={data.visitAddress} isLoading={isLoading} />
      )}

      {data?.postalAddress && (
        <Address title={t('postalAddress')} address={data.postalAddress} isLoading={isLoading} />
      )}

      {data?.invoiceAddress && (
        <Address title={t('invoiceAddress')} address={data.invoiceAddress} isLoading={isLoading} />
      )}
    </>
  )
}
