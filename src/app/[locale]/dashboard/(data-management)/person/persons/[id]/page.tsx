'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { Contact } from '@/services/swr/models/contact.type'
import { PersonAddress } from '@/services/swr/models/person-address.type'
import { usePerson } from '@/services/swr/use-person'
import { safeRender } from '@/utils/safeRender'

import { AddressFilter } from './_components/PersonAddressFilter'
import { ContactFilter } from './_components/PersonContactFilter'

export default function PersonDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.persons')

  const { data, isLoading } = usePerson(params.id)

  const contactColumn: TableColumn<Contact>[] = [
    {
      id: 'id',
      title: t('contacts.id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'contact',
      title: t('contacts.contact'),
      render: row => safeRender(row, 'contactInfo'),
    },
    {
      id: 'contactType',
      title: t('contacts.contactType'),
      render: row => safeRender(row, 'contactType.contactType'),
    },
  ]

  const addressColumn: TableColumn<PersonAddress>[] = [
    {
      id: 'id',
      title: t('addresses.id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'address',
      title: t('addresses.address'),
      render: row => safeRender(row, 'addressId') + ' | ' + safeRender(row, 'address.addressName'),
    },
    {
      id: 'isPrimaryAddress',
      title: t('addresses.primaryAddress'),
      render: row => (safeRender(row, 'isPrimaryAddress') ? t('addresses.yes') : t('addresses.no')),
    },
  ]

  const personField = [
    { label: t('salutation'), value: safeRender(data, 'salutation') },
    { label: t('firstName'), value: safeRender(data, 'firstname') },
    { label: t('lastName'), value: safeRender(data, 'lastname') },
    { label: t('namePrefix'), value: safeRender(data, 'namePrefix') },
    { label: t('nameSuffix'), value: safeRender(data, 'nameSuffix') },
    { label: t('pronounce'), value: safeRender(data, 'pronounce') },
    { label: t('gender'), value: safeRender(data, 'gender.gender') },
    { label: t('personType'), value: safeRender(data, 'personType.type') },
    { label: t('titles'), value: safeRender(data, 'titles') },
    { label: t('department'), value: safeRender(data, 'department') },
    { label: t('role'), value: safeRender(data, 'role') },
  ]

  const tabs = [
    {
      eventKey: 'generalInfo',
      title: t('generalInfo'),
      content: (
        <FieldTextView
          fields={personField}
          isLoading={isLoading}
          translation="dataManagement.persons"
        />
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'contacts',
      title: t('contacts.title'),
      content: (
        <Table<Contact>
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
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'addresses',
      title: t('addresses.title'),
      content: (
        <Table<PersonAddress>
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
          defaultFilters={{ personId: params.id }}
        />
      ),
      condition: Boolean(data),
    },
  ]
  return (
    <>
      <PageTitle
        title={`${t('title')}: ${data?.titles || ''} ${data?.namePrefix || ''} ${data?.firstname || ''} ${data?.lastname || ''} ${data?.nameSuffix || ''}`}
      />
      <DynamicTabs tabs={tabs} defaultActiveKey="generalInfo" />
    </>
  )
}
