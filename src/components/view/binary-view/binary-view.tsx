import { useTranslations } from 'next-intl'
import { Col, Placeholder } from 'react-bootstrap'

import { BinaryViewProps } from './binary-view.type'

export const BinaryView = (props: BinaryViewProps) => {
  const t = useTranslations('common')

  const {
    label,
    value,
    disableColumn,
    isLoading,
    trueLabel = t('yes'),
    falseLabel = t('no'),
    ...colProps
  } = props

  const renderContent = () => {
    const badgeClass = value ? 'badge-light-success' : 'badge-light-danger'

    return (
      <>
        {label && <label className="fw-bold form-label mb-1">{label}</label>}
        {isLoading && <Placeholder size="lg" bg="gray-500" className="w-100" />}
        {!isLoading && (
          <p className="mb-0">
            <span className={`badge ${badgeClass}`}>{value ? trueLabel : falseLabel}</span>
          </p>
        )}
      </>
    )
  }

  if (disableColumn) return renderContent()

  return (
    <Col xs={12} md={6} lg={4} {...colProps}>
      {renderContent()}
    </Col>
  )
}
