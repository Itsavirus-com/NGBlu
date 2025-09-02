'use client'

import { useTranslations } from 'next-intl'
import { Badge } from 'react-bootstrap'

import { WorkspaceActivity } from '../types/workspace.types'

type WorkspaceActivitiesProps = {
  activities?: WorkspaceActivity[]
  type?: 'order' | 'invoice' | 'quote' | 'all'
  isLoading?: boolean
  translationNamespace?: string
}

export const WorkspaceActivities = ({
  activities = [],
  type = 'all',
  isLoading = false,
  translationNamespace,
}: WorkspaceActivitiesProps) => {
  const t = useTranslations(translationNamespace)

  // Mock data - replace with actual API call based on workspaceId
  const mockActivities: WorkspaceActivity[] = [
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

  const dataToUse = activities.length > 0 ? activities : mockActivities
  const filteredActivities =
    type === 'all' ? dataToUse : dataToUse.filter(activity => activity.type === type)

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

  const getTableTitle = () => {
    switch (type) {
      case 'order':
        return t('orders')
      case 'invoice':
        return t('invoices')
      case 'quote':
        return t('quotes')
      default:
        return t('recentActivities')
    }
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <h5 className="fw-bold text-gray-800 my-5">{getTableTitle()}</h5>

        {/* Activities List */}
        <div className="mb-4">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">{t('noActivitiesFound')}</p>
            </div>
          ) : (
            filteredActivities.map(activity => (
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
                    {activity.amount && (
                      <div className="text-end">
                        <span className="fw-bold text-gray-800">
                          {activity.currency} {activity.amount.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
