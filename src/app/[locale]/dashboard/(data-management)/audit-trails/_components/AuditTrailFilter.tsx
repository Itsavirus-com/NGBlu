'use client'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'
import { ControlledDatetime } from '@/components/forms/date-time/DateTime'

export const AuditTrailFilter = () => {
  const t = useTranslations('auditTrails')
  const { watch } = useFormContext()

  const fromDate = watch('filter[from]')

  return (
    <>
      <div className="row mb-5">
        <div className="col-md-6">
          <ControlledDatetime
            name="filter[from]"
            label={t('fromDate')}
            enableTime={false}
            dateFormat="Y-m-d"
            customSubmitDateFormat="yyyy-MM-dd"
            options={{
              maxDate: new Date(),
            }}
          />
        </div>
        <div className="col-md-6">
          <ControlledDatetime
            name="filter[to]"
            label={t('toDate')}
            enableTime={false}
            dateFormat="Y-m-d"
            customSubmitDateFormat="yyyy-MM-dd"
            options={{
              minDate: fromDate,
              maxDate: new Date(),
            }}
            disabled={!fromDate}
          />
        </div>
      </div>
      <ControlledInput name="filter[event]" label={t('filterByEvent')} className="mb-5" />
      <ControlledInput
        name="filter[auditable_type]"
        label={t('filterByRecordType')}
        className="mb-5"
      />
      <ControlledInput name="filter[user_id]" label={t('filterByUser')} className="mb-5" />
    </>
  )
}
