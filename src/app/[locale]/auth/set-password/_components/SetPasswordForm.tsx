'use client'

import { useTranslations } from 'next-intl'
import { Card, Container, ProgressBar, Spinner } from 'react-bootstrap'
import { useWatch } from 'react-hook-form'

import { Button } from '@/components/button/Button'
import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'
import { FormProvider } from '@/components/forms/form-provider/FormProvider'
import { KTIcon } from '@/components/kt-icon/KtIcon'
import { Toast } from '@/components/toast/Toast'

import useSetPasswordForm from '../_hooks/set-password.hook'

export type SetPasswordHookResult = ReturnType<typeof useSetPasswordForm>

interface SetPasswordFormProps {
  useCustomHook?: () => SetPasswordHookResult
  buttonLabel?: string
  title?: string
  subtitle?: string
}

export default function SetPasswordForm({
  useCustomHook,
  buttonLabel,
  title,
  subtitle,
}: SetPasswordFormProps) {
  const t = useTranslations('auth.setPassword')

  // Use the provided custom hook or fall back to the default hook
  const hookToUse = useCustomHook || useSetPasswordForm

  const {
    methods,
    onSubmit,
    isLoading,
    isValidating,
    isTokenValid,
    getPasswordStrength,
    getStrengthColor,
    getStrengthText,
  } = hookToUse()

  const newPassword = useWatch({
    control: methods.control,
    name: 'newPassword',
  })

  const passwordStrength = getPasswordStrength(newPassword || '')

  if (isValidating) {
    return (
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ height: '100vh' }}
      >
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">{t('validatingToken')}</p>
        </div>
      </Container>
    )
  }

  if (isTokenValid === false) {
    return null // Will redirect to login page
  }

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="w-100 px-3">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-3">{title || t('welcome')}</h2>
          <p className="text-muted">{subtitle || t('pleaseSetPassword')}</p>
        </div>

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Card>
            <Card.Header>
              <Card.Title>{t('createPassword')}</Card.Title>
              <Card.Subtitle className="text-muted">
                {t('thisWillBeUsedToSecureYourAccount')}
              </Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <div className="mb-5">
                <div className="position-relative">
                  <ControlledInput
                    name="newPassword"
                    type="password"
                    label={t('newPassword')}
                    isRequired
                    autoFocus
                    containerClass="mb-2"
                  />
                </div>

                {newPassword && (
                  <div className="mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fs-7">{t('passwordStrength')}</span>
                      <span className="fs-7 fw-bold">{getStrengthText(passwordStrength)}</span>
                    </div>
                    <ProgressBar
                      now={passwordStrength}
                      variant={getStrengthColor(passwordStrength)}
                      className="h-8px"
                    />

                    <div className="mt-4">
                      <p className="fs-7 fw-bold mb-2">{t('passwordRequirements')}</p>
                      <ul className="fs-7 ps-4">
                        <li className="mb-1">
                          <div className="d-flex align-items-center">
                            <KTIcon
                              iconName={newPassword.length >= 12 ? 'check' : 'cross'}
                              className={`fs-7 me-2 ${
                                newPassword.length >= 12 ? 'text-success' : 'text-danger'
                              }`}
                            />
                            <span>{t('atLeast12Characters')}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-5">
                <div className="position-relative">
                  <ControlledInput
                    name="confirmPassword"
                    type="password"
                    label={t('confirmPassword')}
                    isRequired
                    containerClass="mb-2"
                  />
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button
                type="submit"
                label={buttonLabel}
                colorClass="primary"
                className="w-100"
                loading={isLoading}
                disabled={isLoading}
              />
            </Card.Footer>
          </Card>
        </FormProvider>
      </div>
      <Toast />
    </Container>
  )
}
