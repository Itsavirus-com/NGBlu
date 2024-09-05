import { Col, Placeholder } from 'react-bootstrap'

import { TextViewProps } from './text-view.type'

export const TextView = (props: TextViewProps) => {
  const { label, value, disableColumn, isLoading, ...colProps } = props

  const renderContent = () => (
    <>
      {label && <label className="fw-bold form-label mb-1">{label}</label>}
      {isLoading && <Placeholder size="lg" bg="gray-500" className="w-100" />}
      {!isLoading && <p className="m-0">{value || '-'}</p>}
    </>
  )

  if (disableColumn) return renderContent()

  return (
    <Col xs={12} md={6} lg={4} {...colProps}>
      {renderContent()}
    </Col>
  )
}
