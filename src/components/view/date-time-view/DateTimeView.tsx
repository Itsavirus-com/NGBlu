import dayjs from 'dayjs'
import { Col, Placeholder } from 'react-bootstrap'

import { DateTimeViewProps, dateTimeFormats } from './date-time-view.type'

export const DateTimeView = (props: DateTimeViewProps) => {
  const {
    label,
    value,
    disableColumn,
    isLoading,
    format = 'default',
    customEmptyText = '-',
    ...colProps
  } = props

  const formattedValue =
    value && dayjs(value).isValid() ? dayjs(value).format(dateTimeFormats[format]) : customEmptyText

  const renderContent = () => (
    <>
      {label && <label className="fw-bold form-label mb-1">{label}</label>}
      {isLoading && <Placeholder size="lg" bg="gray-500" className="w-100" />}
      {!isLoading && <p className="m-0">{formattedValue}</p>}
    </>
  )

  if (disableColumn) return renderContent()

  return (
    <Col xs={12} md={6} lg={4} {...colProps}>
      {renderContent()}
    </Col>
  )
}
