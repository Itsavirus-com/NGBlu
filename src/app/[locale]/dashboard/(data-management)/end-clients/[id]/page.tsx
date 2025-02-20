'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { EndClientAddress } from '@/services/swr/models/end-client-address.type'
import { EndClientContact } from '@/services/swr/models/end-client-contact.type'
import { EndClientPaymentDetail } from '@/services/swr/models/end-client-payment-detail.type'
import { EndClientProject } from '@/services/swr/models/end-client-project.type'
import { useEndClient } from '@/services/swr/use-end-client'
import { safeRender } from '@/utils/safeRender'

import { EndClientAddressFilter } from './_components/EndClientAddressFilter'
import { EndClientContactFilter } from './_components/EndClientContactFilter'
import EndClientInfo from './_components/EndClientInfo'
import { EndClientPaymentDetailFilter } from './_components/EndClientPaymentDetailFilter'
import { EndClientProjectFilter } from './_components/EndClientProjectFilter'

export default function EndClientDetails({ params }: { params: { id: number } }) {
  const router = useRouter()
  const t = useTranslations('dataManagement.endClients')
  const { showToast } = useToast()

  const { data, isLoading } = useEndClient(params.id)

  const addressColumns: TableColumn<EndClientAddress>[] = [
    {
      id: 'id',
      title: t('addresses.id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'address',
      title: t('addresses.address'),
      render: row => `${safeRender(row, 'addressId')} | ${safeRender(row, 'address.addressName')}`,
    },
    {
      id: 'isPrimaryAddress',
      title: t('addresses.primaryAddress'),
      render: row => (row?.isPrimaryAddress ? t('addresses.yes') : t('addresses.no')),
    },
  ]

  const contactColumns: TableColumn<EndClientContact>[] = [
    {
      id: 'id',
      title: t('contacts.id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'contact',
      title: t('contacts.contactInfo'),
      render: row =>
        `${safeRender(row, 'contactInfoId')} | ${safeRender(row, 'contactInfo.contactInfo')}`,
    },
    {
      id: 'responsibility',
      title: t('contacts.responsibility'),
      render: row =>
        `${safeRender(row, 'responsibilityId')} | ${safeRender(row, 'responsibility.responsibility')}`,
    },
  ]

  const paymentDetailColumns: TableColumn<EndClientPaymentDetail>[] = [
    {
      id: 'id',
      title: t('paymentDetails.id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'person',
      title: t('paymentDetails.paymentInfo'),
      render: row =>
        `${safeRender(row, 'paymentInfoId')} | ${safeRender(row, 'paymentInfo.paymentType.paymentType')}`,
    },
  ]

  const projectColumns: TableColumn<EndClientProject>[] = [
    {
      id: 'id',
      title: t('projects.id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'project',
      title: t('projects.project'),
      render: row => `${safeRender(row, 'projectId')} | ${safeRender(row, 'project.projectName')}`,
    },
    {
      id: 'address',
      title: t('projects.endClientAddress'),
      render: row =>
        `${safeRender(row, 'endclientAddressId')} | ${safeRender(row, 'endclientAddress.addressName')}`,
    },
  ]

  const tabs = [
    {
      eventKey: 'endClientInfo',
      title: t('info'),
      content: <EndClientInfo data={data} isLoading={isLoading} />,
      condition: Boolean(data),
    },
    {
      eventKey: 'addresses',
      title: t('addresses.addresses'),
      content: (
        <Table<EndClientAddress>
          className="mt-4"
          toolbars={[
            {
              icon: 'plus',
              label: t('addresses.newAddress'),
              colorClass: 'light-primary',
              href: `${params.id}/addresses/new`,
            },
          ]}
          filters={<EndClientAddressFilter />}
          columns={addressColumns}
          apiPath={`end-clients/${params.id}/addresses`}
          actionBasePath={`${params.id}/addresses`}
          actions={['view', 'edit', 'delete']}
        />
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'contacts',
      title: t('contacts.contacts'),
      content: (
        <Table<EndClientContact>
          className="mt-4"
          columns={contactColumns}
          toolbars={[
            {
              icon: 'plus',
              label: t('contacts.newContact'),
              colorClass: 'light-primary',
              onClick: () => {
                if (data?.enterpriseRootsCount === 0 && data?.businessPartnersCount === 0) {
                  showToast({
                    variant: 'danger',
                    body: 'Cannot create a new contact. This end client has no relationships with Enterprise Roots or Business Partners.',
                  })
                  return
                }
                router.push(`${params.id}/contacts/new`)
              },
            },
          ]}
          filters={<EndClientContactFilter />}
          apiPath={`end-clients/${params.id}/contacts`}
          actionBasePath={`${params.id}/contacts`}
          actions={['view', 'edit', 'delete']}
        />
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'paymentDetails',
      title: t('paymentDetails.paymentDetails'),
      content: (
        <Table<EndClientPaymentDetail>
          className="mt-4"
          toolbars={[
            {
              icon: 'plus',
              label: t('paymentDetails.newPaymentDetail'),
              colorClass: 'light-primary',
              href: `${params.id}/payment-details/new`,
            },
          ]}
          filters={<EndClientPaymentDetailFilter />}
          columns={paymentDetailColumns}
          apiPath={`end-clients/${params.id}/payment-details`}
          actionBasePath={`${params.id}/payment-details`}
          actions={['view', 'edit', 'delete']}
        />
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'projects',
      title: t('projects.projects'),
      content: (
        <Table<EndClientProject>
          className="mt-4"
          toolbars={[
            {
              icon: 'plus',
              label: t('projects.newProject'),
              colorClass: 'light-primary',
              href: `${params.id}/projects/new`,
            },
          ]}
          filters={<EndClientProjectFilter />}
          columns={projectColumns}
          apiPath={`end-clients/${params.id}/projects`}
          actionBasePath={`${params.id}/projects`}
          actions={['view', 'edit', 'delete']}
        />
      ),
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <PageTitle title={`${t('endClient')}: ${safeRender(data, 'name')}`} />
      <DynamicTabs tabs={tabs} defaultActiveKey="endClientInfo" />
    </>
  )
}
