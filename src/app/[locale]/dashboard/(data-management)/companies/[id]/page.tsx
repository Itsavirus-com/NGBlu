'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { useCompany } from '@/services/swr/use-company'
import { safeRender } from '@/utils/safeRender'

import { Address } from './_components/address'

export default function CompanyDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.companies')

  const { data, isLoading } = useCompany(params.id)

  const companyInfoFields = [
    { label: t('name'), value: safeRender(data, 'companyname') },
    { label: t('status'), value: safeRender(data, 'companyStatus.status') },
    { label: t('vatNumber'), value: safeRender(data, 'vatNumber') },
    { label: t('kvkNumber'), value: safeRender(data, 'chamberOfCommerceId') },
  ]

  const tabs = [
    {
      eventKey: 'companyInfo',
      title: t('companyInfo'),
      content: (
        <FieldTextView
          fields={companyInfoFields}
          isLoading={isLoading}
          translation="dataManagement.companies"
          title={t('companyInfo')}
        />
      ),
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
