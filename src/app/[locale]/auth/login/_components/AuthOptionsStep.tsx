import { useTranslations } from 'next-intl'

import { Button } from '@/components/button/button'

interface AuthOptionsStepProps {
  emailValue: string
  isCheckingPasskey: boolean
  isPasskeySupported: boolean
  userHasPasskey: boolean
  isPasskeyAuthenticating: boolean
  onPasskeySignIn: () => void
  onPasswordOption: () => void
}

export function AuthOptionsStep({
  emailValue,
  isCheckingPasskey,
  isPasskeySupported,
  userHasPasskey,
  isPasskeyAuthenticating,
  onPasskeySignIn,
  onPasswordOption,
}: AuthOptionsStepProps) {
  const t = useTranslations('auth.login')
  const tPasskey = useTranslations('auth.passkey')

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="text-gray-800 fs-2x fw-bolder mb-3">{t('continueAs')}</h1>
        <div className="text-gray-500 fw-semibold fs-6 text-break">{emailValue}</div>
      </div>

      {/* Show loading state while checking passkey */}
      {isCheckingPasskey ? (
        <div className="text-center py-6">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Checking passkey...</span>
          </div>
          <div className="mt-3 text-muted fs-6">Checking authentication options...</div>
        </div>
      ) : (
        <>
          {/* Passkey option - Show only if supported and user has passkey */}
          {isPasskeySupported && userHasPasskey && (
            <div className="mb-5">
              <Button
                type="button"
                onClick={onPasskeySignIn}
                label={tPasskey('signInWithPasskey')}
                icon="fingerprint-scanning"
                className="btn btn-flex btn-outline btn-outline-primary btn-active-light-primary flex-center text-nowrap w-100 py-4"
                loading={isPasskeyAuthenticating}
                disabled={isPasskeyAuthenticating}
                size="lg"
              />
            </div>
          )}

          {/* Password option */}
          <div className="mb-8">
            <Button
              type="button"
              onClick={onPasswordOption}
              label={t('continueWithPassword')}
              icon="key"
              className="btn btn-flex btn-outline btn-outline-primary btn-active-light-primary flex-center text-nowrap w-100 py-4"
              size="lg"
            />
          </div>

          {/* Passkey info for unsupported browsers or users without passkey */}
          {(!isPasskeySupported || !userHasPasskey) && (
            <div className="alert alert-primary d-flex align-items-center p-4 border-0 bg-light-primary">
              <i className="ki-duotone ki-information-5 fs-2hx text-primary me-4">
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
              </i>
              <div className="d-flex flex-column">
                <span className="fw-semibold fs-6">
                  {!isPasskeySupported ? tPasskey('notSupportedInfo') : tPasskey('setUpPasskey')}
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
