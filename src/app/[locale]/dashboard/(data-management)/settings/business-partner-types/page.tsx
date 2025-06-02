'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/Table'
import { TableColumn } from '@/components/table/table.type'
import { BusinessPartnerType } from '@/services/swr/models/business-partner-type.type'
import { safeRender } from '@/utils/safeRender'

import { BusinessPartnerTypeFilter } from './_components/BusinessPartnerTypeFilter'

export default function BusinessPartnerTypes() {
  const t = useTranslations('dataManagement.businessPartnerTypes')

  const columns: TableColumn<BusinessPartnerType>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'type',
      title: t('type'),
      render: row => safeRender(row, 'name'),
    },
  ]

  return (
    <Table<BusinessPartnerType>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newBusinessPartnerType'),
          colorClass: 'light-primary',
          href: 'business-partner-types/new',
        },
      ]}
      filters={<BusinessPartnerTypeFilter />}
      columns={columns}
      apiPath="business-partners/types"
      actionBasePath="business-partner-types"
      actions={['edit', 'delete']}
    />
  )
}
