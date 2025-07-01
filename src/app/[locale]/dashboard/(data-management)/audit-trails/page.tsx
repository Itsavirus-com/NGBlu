'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { DateTimeView } from '@/components/view/date-time-view/DateTimeView'
import { AuditTrail } from '@/services/swr/models/audit-trail.type'
import { safeRender } from '@/utils/safeRender'

import { AuditTrailFilter } from './_components/AuditTrailFilter'

export default function AuditTrails() {
  const t = useTranslations('auditTrails')

  const formatAuditableType = (type: string) => {
    return type.replace('App\\Models\\IO2\\', '')
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

  const columns: TableColumn<AuditTrail>[] = [
    {
      id: 'event',
      title: t('event'),
      render: row => formatEvent(row.event),
    },
    {
      id: 'createdAt',
      title: t('createdAt'),
      render: row => (
        <DateTimeView value={safeRender(row, 'createdAt')} format="default-12" disableColumn />
      ),
    },
    {
      id: 'user',
      title: t('user'),
      render: row => {
        if (!row.user) {
          return <span>{t('noUser')}</span>
        }
        return (
          <div>
            <div className="fw-bold">{safeRender(row.user, 'displayName')}</div>
            <div className="text-muted fs-7">{safeRender(row.user, 'email')}</div>
          </div>
        )
      },
    },
    {
      id: 'userId',
      title: t('userId'),
      render: row => safeRender(row.user, 'id'),
    },
    {
      id: 'auditableType',
      title: t('auditableType'),
      render: row => formatAuditableType(row.auditableType),
    },
    {
      id: 'auditableId',
      title: t('auditableId'),
      render: row => safeRender(row, 'auditableId'),
    },
  ]

  return (
    <>
      <Table<AuditTrail>
        title={t('title')}
        filters={<AuditTrailFilter />}
        columns={columns}
        apiPath="audits"
        actions={['view']}
        actionBasePath="audit-trails"
      />
    </>
  )
}
