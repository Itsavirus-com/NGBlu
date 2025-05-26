import dayjs from 'dayjs'
import { useMemo } from 'react'

import { DateWithLabelProps } from './date-with-label.type'

export const DateWithLabel = ({ label, value, className }: DateWithLabelProps) => {
  const formattedDate = useMemo(() => dayjs(value).format('DD MMM YYYY HH:mm:ss'), [value])

  if (!value) return null

  return (
    <div className={className}>
      <h4 className="text-gray-900 fw-bold fs-6">{label}</h4>
      <p className="text-gray-600 fs-6">{formattedDate}</p>
    </div>
  )
}
