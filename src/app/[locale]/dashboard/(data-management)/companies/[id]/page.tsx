'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { useCompany } from '@/services/swr/use-company'

import { Address } from './components/address'
import { CompanyInfo } from './components/company-info'

export default function CompanyDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.companies')

  const { data, isLoading } = useCompany(params.id)

  const tabs = [
    {
      eventKey: 'companyInfo',
      title: t('companyInfo'),
      content: <CompanyInfo data={data} isLoading={isLoading} />,
      condition: Boolean(data),
    },
    {
      eventKey: 'legalAddress',
      title: t('legalAddress'),
      content: (
        <Address title={t('legalAddress')} address={data?.legalAddress!} isLoading={isLoading} />
      ),
      condition: Boolean(data?.legalAddress),
    },
    {
      eventKey: 'visitAddress',
      title: t('visitAddress'),
      content: (
        <Address title={t('visitAddress')} address={data?.visitAddress!} isLoading={isLoading} />
      ),
      condition: Boolean(data?.visitAddress),
    },
    {
      eventKey: 'postalAddress',
      title: t('postalAddress'),
      content: (
        <Address title={t('postalAddress')} address={data?.postalAddress!} isLoading={isLoading} />
      ),
      condition: Boolean(data?.postalAddress),
    },
    {
      eventKey: 'invoiceAddress',
      title: t('invoiceAddress'),
      content: (
        <Address
          title={t('invoiceAddress')}
          address={data?.invoiceAddress!}
          isLoading={isLoading}
        />
      ),
      condition: Boolean(data?.invoiceAddress),
    },
  ]

  return (
    <>
      <PageTitle title={data?.companyname || ''} />
      <DynamicTabs tabs={tabs} defaultActiveKey="companyInfo" />
    </>
  )
}
