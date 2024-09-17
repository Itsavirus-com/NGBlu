'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { Country } from '@/services/swr/models/country.type'

import { CountryFilter } from './components/country-filter'

export default function Countries() {
  const t = useTranslations('dataManagement.countries')

  const columns: TableColumn<Country>[] = [
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
      id: 'iso',
      title: t('iso'),
      render: row => row.iso,
    },
    {
      id: 'locale',
      title: t('locale'),
      render: row => row.locale,
    },
    {
      id: 'currency',
      title: t('currency'),
      render: row => row.currency,
    },
    {
      id: 'decimalSymbol',
      title: t('decimalSymbol'),
      render: row => row.decimalSymbol,
    },
  ]

  return (
    <Table<Country>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newCountry'),
          colorClass: 'light-primary',
          href: 'countries/new',
        },
      ]}
      filters={<CountryFilter />}
      columns={columns}
      apiPath="countries"
      actionBasePath="countries"
      actions={['edit', 'delete']}
    />
  )
}
