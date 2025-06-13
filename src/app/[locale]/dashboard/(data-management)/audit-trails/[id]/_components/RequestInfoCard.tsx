import { useTranslations } from 'next-intl'

import { AuditTrail } from '@/services/swr/models/audit-trail.type'

interface RequestInfoCardProps {
  auditTrail: AuditTrail
}

export const RequestInfoCard = ({ auditTrail }: RequestInfoCardProps) => {
  const t = useTranslations('auditTrails')

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">{t('requestInfo')}</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
            <tbody>
              <tr>
                <td className="fw-bold text-muted">{t('url')}</td>
                <td className="text-dark">{auditTrail.url}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted">{t('ipAddress')}</td>
                <td className="text-dark">{auditTrail.ipAddress}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted">{t('location')}</td>
                <td className="text-dark">{auditTrail.location}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted">{t('userAgent')}</td>
                <td className="text-dark">{auditTrail.userAgent}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
