import { useTranslations } from 'next-intl'
import { Card } from 'react-bootstrap'

export const PasskeyNotSupported = () => {
  const t = useTranslations('account.passkeys')

  return (
    <Card>
      <Card.Body>
        <div className="text-center py-4">
          <i className="bi bi-exclamation-triangle text-warning fs-1 mb-3"></i>
          <h5>{t('notSupported')}</h5>
          <p className="text-muted">{t('notSupportedMessage')}</p>
        </div>
      </Card.Body>
    </Card>
  )
}
