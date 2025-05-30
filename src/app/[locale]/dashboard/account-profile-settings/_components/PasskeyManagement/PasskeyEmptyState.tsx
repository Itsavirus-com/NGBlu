import { useTranslations } from 'next-intl'
import { Button, Card } from 'react-bootstrap'

interface PasskeyEmptyStateProps {
  isPlatformAuthenticatorAvailable: boolean
  isRegistering: boolean
  onRegisterClick: () => void
}

export const PasskeyEmptyState = ({
  isPlatformAuthenticatorAvailable,
  isRegistering,
  onRegisterClick,
}: PasskeyEmptyStateProps) => {
  const t = useTranslations('account.passkeys')

  return (
    <Card>
      <Card.Body>
        <div className="text-center py-4">
          <i className="bi bi-shield-plus text-muted fs-1 mb-3"></i>
          <h6>{t('noPasskeys')}</h6>
          <p className="text-muted">{t('noPasskeysMessage')}</p>
          {isPlatformAuthenticatorAvailable && (
            <p className="text-success">
              <i className="bi bi-check-circle me-2"></i>
              {t('platformAuthenticatorAvailable')}
            </p>
          )}
          <Button variant="primary" onClick={onRegisterClick} disabled={isRegistering}>
            {isRegistering ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                {t('registering')}
              </>
            ) : (
              <>
                <i className="bi bi-plus-circle me-2"></i>
                {t('addPasskey')}
              </>
            )}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
