import { useTranslations } from 'next-intl'

import { DateTimeView } from '@/components/view/date-time-view/DateTimeView'
import { AuditTrail } from '@/services/swr/models/audit-trail.type'


interface UserInfoCardProps {
  user: AuditTrail['user']
}

export const UserInfoCard = ({ user }: UserInfoCardProps) => {
  const t = useTranslations('auditTrails')

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">{t('userInfo')}</h5>
      </div>
      <div className="card-body">
        {user ? (
          <div className="table-responsive">
            <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
              <tbody>
                <tr>
                  <td className="fw-bold text-muted">Name</td>
                  <td className="text-dark">{user.displayName}</td>
                </tr>
                <tr>
                  <td className="fw-bold text-muted">Email</td>
                  <td className="text-dark">{user.email}</td>
                </tr>
                <tr>
                  <td className="fw-bold text-muted">Auth Type</td>
                  <td className="text-dark">{user.authType}</td>
                </tr>
                <tr>
                  <td className="fw-bold text-muted">Last Login</td>
                  <td className="text-dark">
                    <DateTimeView value={user.lastLogin} format="default-12" disableColumn />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-muted">{t('noUser')}</div>
        )}
      </div>
    </div>
  )
}
