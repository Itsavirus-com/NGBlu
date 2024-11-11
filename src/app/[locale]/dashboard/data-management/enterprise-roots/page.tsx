'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { EnterpriseRoot } from '@/services/swr/models/enterprise-root.type'

import { EnterpriseRootFilter } from './components/enterprise-root-filter'

export default function EnterpriseRoots() {
  const t = useTranslations('dataManagement.enterpriseRoots')

  const columns: TableColumn<EnterpriseRoot>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => row.id,
    },
    {
      id: 'name',
      title: t('name'),
      render: row => row.name,
    },
    {
      id: 'enterpriseRootAddress',
      title: t('enterpriseRootAddress'),
      render: row =>
        row.enterpriseRootAddresses
          ? `${row.enterpriseRootAddressesId} | ${row.enterpriseRootAddresses.address.addressName}`
          : '-',
    },
    {
      id: 'organisationUnitId',
      title: t('organisationUnit'),
      render: row => (row.ouUnit ? `${row.ouUnitId} | ${row.ouUnit.name}` : '-'),
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
          href: 'enterprise-root/new',
        },
      ]}
      filters={<EnterpriseRootFilter />}
      columns={columns}
      apiPath="enterprise-roots"
      actionBasePath="enterprise-root"
      actions={['view', 'edit', 'delete']}
    />
  )
}
