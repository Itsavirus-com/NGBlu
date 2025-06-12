'use client'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'
import { AuditTrail } from '@/services/swr/models/audit-trail.type'
import { useAuditTrail } from '@/services/swr/use-audit-trail'

import {
  ChangesPreviewCard,
  ErrorState,
  EventInfoCard,
  RequestInfoCard,
  UserInfoCard,
} from './_components'

export default function AuditTrailDetail() {
  const t = useTranslations('auditTrails')
  const params = useParams()
  const id = params.id as string

  const { data, isLoading } = useAuditTrail(id)
  const auditTrail = data as AuditTrail

  if (isLoading) {
    return <Loading />
  }

  if (!auditTrail) {
    return <ErrorState />
  }

  const hasChanges = auditTrail.oldValues || auditTrail.newValues

  return (
    <>
      <PageTitle title={t('auditDetails')} />

      <div className="row g-6 app-container">
        {/* Event and User Info Row */}
        <div className="col-md-6">
          <EventInfoCard auditTrail={auditTrail} />
        </div>

        <div className="col-md-6">
          <UserInfoCard user={auditTrail.user} />
        </div>

        {/* Request Info */}
        <div className="col-12">
          <RequestInfoCard auditTrail={auditTrail} />
        </div>

        {/* Changes Preview */}
        {hasChanges && (
          <div className="col-12">
            <ChangesPreviewCard oldValues={auditTrail.oldValues} newValues={auditTrail.newValues} />
          </div>
        )}
      </div>
    </>
  )
}
