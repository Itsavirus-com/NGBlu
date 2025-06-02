'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/Table'
import { TableColumn } from '@/components/table/table.type'
import { EnterpriseRoot } from '@/services/swr/models/enterprise-root.type'
import { safeRender } from '@/utils/safeRender'

import { EnterpriseRootFilter } from './_components/EnterpriseRootFilter'

export default function EnterpriseRoots() {
  const t = useTranslations('dataManagement.enterpriseRoots')

  const columns: TableColumn<EnterpriseRoot>[] = [
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
      id: 'enterpriseRootAddress',
      title: t('enterpriseRootAddress'),
      render: row =>
        `${safeRender(row, 'enterpriseRootAddressesId')} | ${safeRender(row, 'enterpriseRootAddresses.addressName')}`,
    },
    {
      id: 'organisationUnitId',
      title: t('organisationUnit'),
      render: row => `${safeRender(row, 'ouUnitId')} | ${safeRender(row, 'ouUnit.name')}`,
    },
  ]

  return (
    <Table<EnterpriseRoot>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newEnterpriseRoot'),
          colorClass: 'light-primary',
          href: 'enterprise-roots/new',
        },
      ]}
      filters={<EnterpriseRootFilter />}
      columns={columns}
      apiPath="enterprise-roots"
      actionBasePath="enterprise-roots"
      actions={['view', 'edit', 'delete']}
    />
  )
}
