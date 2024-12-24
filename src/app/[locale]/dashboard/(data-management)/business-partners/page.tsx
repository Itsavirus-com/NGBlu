'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { BusinessPartner } from '@/services/swr/models/business-partner.type'
import { safeRender } from '@/utils/safeRender'

import { BusinessPartnerFilter } from './components/business-partner-filter'

export default function BusinessPartners() {
  const t = useTranslations('dataManagement.businessPartners')

  const columns: TableColumn<BusinessPartner>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'name',
      title: t('name'),
      render: row => safeRender(row, 'name'),
    },
    {
      id: 'type',
      title: t('type'),
      render: row => safeRender(row, 'businessPartnerType.name'),
    },
    {
      id: 'company',
      title: t('company'),
      render: row => safeRender(row, 'companyInfo.companyname'),
    },
  ]

  return (
    <Table<BusinessPartner>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newBusinessPartner'),
          colorClass: 'light-primary',
          href: 'business-partners/new',
        },
      ]}
      filters={<BusinessPartnerFilter />}
      columns={columns}
      apiPath="business-partners"
      actionBasePath="business-partners"
      actions={['view', 'edit', 'delete']}
    />
  )
}
