'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { TextView } from '@/components/view/text-view/text-view'
import { Contact } from '@/services/swr/models/contact.type'
import { PersonAddress } from '@/services/swr/models/person-address.type'
import { usePerson } from '@/services/swr/use-person'

import { AddressFilter } from './components/address-filter'
import { ContactFilter } from './components/contact-filter'

export default function PersonDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.persons')

  const { data, isLoading } = usePerson(params.id)

  const contactColumn: TableColumn<Contact>[] = [
    {
      id: 'id',
      title: t('contacts.id'),
      render: row => row.id,
    },
    {
      id: 'contact',
      title: t('contacts.contact'),
      render: row => row.contactInfo,
    },
    {
      id: 'contactType',
      title: t('contacts.contactType'),
      render: row => row.contactType?.contactType,
    },
  ]

  const addressColumn: TableColumn<PersonAddress>[] = [
    {
      id: 'id',
      title: t('addresses.id'),
      render: row => row.id,
    },
    {
      id: 'address',
      title: t('addresses.address'),
      render: row => `${row.addressId} | ${row.address.addressName}`,
    },
    {
      id: 'isPrimaryAddress',
      title: t('addresses.primaryAddress'),
      render: row => (row.isPrimaryAddress ? t('addresses.yes') : t('addresses.no')),
    },
  ]

  return (
    <>
      <PageTitle title={`${data?.firstname || ''} ${data?.lastname || ''}`} />

      <Page title={t('generalInfo')}>
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('salutation')}
            value={data?.salutation}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('firstName')}
            value={data?.firstname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('lastName')}
            value={data?.lastname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('nameSuffix')}
            value={data?.nameSuffix}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('nameSuffix')}
            value={data?.nameSuffix}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('pronounce')}
            value={data?.pronounce}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('gender')}
            value={data?.gender?.gender}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('personType')}
            value={data?.personType?.type}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('titles')}
            value={data?.titles}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('department')}
            value={data?.department}
          />
          <TextView className="my-3" isLoading={isLoading} label={t('role')} value={data?.role} />
        </Row>
      </Page>

      <Table<Contact>
        title={t('contacts.title')}
        toolbars={[
          {
            icon: 'plus',
            label: t('contacts.newContact'),
            colorClass: 'light-primary',
            href: `${params.id}/contacts/new`,
          },
        ]}
        filters={<ContactFilter />}
        columns={contactColumn}
        apiPath="contacts/infos"
        actionBasePath={`${params.id}/contacts`}
        actions={['edit', 'delete']}
        className="mt-6"
        defaultFilters={{ personId: params.id }}
      />

      <Table<PersonAddress>
        title={t('addresses.title')}
        toolbars={[
          {
            icon: 'plus',
            label: t('addresses.newAddress'),
            colorClass: 'light-primary',
            href: `${params.id}/addresses/new`,
          },
        ]}
        filters={<AddressFilter />}
        columns={addressColumn}
        apiPath={`persons/${params.id}/addresses`}
        actionBasePath={`${params.id}/addresses`}
        actions={['edit', 'delete']}
        className="mt-6"
      />
    </>
  )
}
