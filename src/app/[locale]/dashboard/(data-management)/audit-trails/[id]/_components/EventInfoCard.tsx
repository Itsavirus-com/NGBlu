import { useTranslations } from 'next-intl'

import { DateTimeView } from '@/components/view/date-time-view/DateTimeView'
import { AuditTrail } from '@/services/swr/models/audit-trail.type'


interface EventInfoCardProps {
  auditTrail: AuditTrail
}

export const EventInfoCard = ({ auditTrail }: EventInfoCardProps) => {
  const t = useTranslations('auditTrails')

  const formatAuditableType = (type: string) => {
    return type?.replace('App\\\\Models\\\\IO2\\\\', '') || 'Unknown'
  }

  const formatEvent = (event: string) => {
    const eventClass =
      {
        created: 'badge-light-success',
        updated: 'badge-light-primary',
        deleted: 'badge-light-danger',
        restored: 'badge-light-warning',
      }[event] || 'badge-light-secondary'

    return (
      <span className={`badge ${eventClass}`}>
        {t(event as 'created' | 'updated' | 'deleted' | 'restored')}
      </span>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">{t('eventInfo')}</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
            <tbody>
              <tr>
                <td className="fw-bold text-muted">{t('createdAt')}</td>
                <td className="text-dark">
                  <DateTimeView value={auditTrail.createdAt} format="default-12" disableColumn />
                </td>
              </tr>
              <tr>
                <td className="fw-bold text-muted">{t('eventId')}</td>
                <td className="text-dark">{auditTrail.id}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted">{t('eventType')}</td>
                <td>{formatEvent(auditTrail.event)}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted">{t('auditableId')}</td>
                <td className="text-dark">{auditTrail.auditableId}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted">{t('auditableType')}</td>
                <td className="text-dark">{formatAuditableType(auditTrail.auditableType)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
