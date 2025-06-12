import snakeCase from 'lodash/snakeCase'
import { useTranslations } from 'next-intl'

interface ChangesPreviewCardProps {
  oldValues?: Record<string, any>
  newValues?: Record<string, any>
}

export const ChangesPreviewCard = ({ oldValues, newValues }: ChangesPreviewCardProps) => {
  const t = useTranslations('auditTrails')

  if (!oldValues && !newValues) return null

  const allKeys = new Set([...Object.keys(oldValues || {}), ...Object.keys(newValues || {})])

  if (allKeys.size === 0) return null

  const renderValue = (value: any) => {
    if (value === undefined) {
      return <span className="text-muted fst-italic">-</span>
    }
    return <span>{JSON.stringify(value)}</span>
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">{t('changesPreview')}</h5>
      </div>
      <div className="card-body">
        {allKeys.size === 0 ? (
          <div className="text-muted">{t('noChanges')}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bold">
                  <th className="min-w-150px">{t('field')}</th>
                  <th className="min-w-200px">{t('beforeChange')}</th>
                  <th className="min-w-200px">{t('afterChange')}</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(allKeys).map(key => {
                  const oldValue = oldValues?.[key]
                  const newValue = newValues?.[key]

                  return (
                    <tr key={key}>
                      <td className="fw-bold">{snakeCase(key)}</td>
                      <td>
                        <div className="d-flex align-items-center text-muted">
                          {renderValue(oldValue)}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center text-dark">
                          {renderValue(newValue)}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
