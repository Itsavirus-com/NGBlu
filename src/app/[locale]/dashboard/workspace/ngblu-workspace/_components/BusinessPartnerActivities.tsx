'use client'

import { useTranslations } from 'next-intl'
import { Badge } from 'react-bootstrap'

import { TableColumn } from '@/components/table/table.type'

import { BusinessPartnerActivity } from '../_types/business-partner.types'

type BusinessPartnerActivitiesProps = {
  businessPartnerId: string
  type?: 'order' | 'invoice' | 'quote' | 'all'
}

export const BusinessPartnerActivities = ({
  businessPartnerId,
  type = 'all',
}: BusinessPartnerActivitiesProps) => {
  const t = useTranslations('workspace.businessPartner')

  // Mock data - replace with actual API call
  const mockActivities: BusinessPartnerActivity[] = [
    {
      id: 1,
      type: 'order',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '16 Feb, 2024 at 09:00 GMT+1',
      status: 'open',
      amount: 1250.0,
      currency: 'EUR',
    },
    {
      id: 2,
      type: 'order',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '16 Feb, 2024 at 09:00 GMT+1',
      status: 'open',
    },
    {
      id: 3,
      type: 'invoice',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '16 Feb, 2024 at 09:00 GMT+1',
      status: 'open',
    },
    {
      id: 4,
      type: 'quote',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '16 Feb, 2024 at 09:00 GMT+1',
      status: 'pending',
    },
  ]

  const filteredActivities =
    type === 'all' ? mockActivities : mockActivities.filter(activity => activity.type === type)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: { variant: 'primary', text: t('open'), className: 'text-white' },
      closed: { variant: 'success', text: t('closed'), className: '' },
      pending: { variant: 'warning', text: t('pending'), className: '' },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending

    return (
      <Badge bg={`light-${config.variant}`}>
        <Badge bg={config.variant} className={`fs-7 ${config.className}`}>
          {config.text}
        </Badge>
      </Badge>
    )
  }

  const columns: TableColumn<BusinessPartnerActivity>[] = [
    {
      id: 'type',
      title: t('type'),
      render: row => <span className="text-capitalize fw-semibold">{t(row.type)}</span>,
    },
    {
      id: 'description',
      title: t('description'),
      render: row => (
        <div>
          <p className="mb-1">{row.description}</p>
          <small className="text-muted">{row.date}</small>
        </div>
      ),
    },
    {
      id: 'status',
      title: t('status'),
      render: row => getStatusBadge(row.status),
    },
    {
      id: 'amount',
      title: t('amount'),
      render: row => (row.amount ? `${row.currency} ${row.amount.toFixed(2)}` : '-'),
    },
  ]

  const getTableTitle = () => {
    switch (type) {
      case 'order':
        return t('orders')
      case 'invoice':
        return t('invoices')
      case 'quote':
        return t('quotes')
      default:
        return t('currentActivities')
    }
  }

  return (
    <div>
      <div className="mb-4">
        <h5 className="fw-bold text-gray-800 my-3">{getTableTitle()}</h5>

        {/* Activities List */}
        <div className="mb-4">
          {filteredActivities.map(activity => (
            <div key={activity.id} className="card border border-gray-200 mb-3">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center mb-2">
                      <span className="me-2">{getStatusBadge(activity.status)}</span>
                      <span className="fw-bold text-gray-800">{t(activity.type)}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{activity.description}</p>
                    <small className="text-muted">{activity.date}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
