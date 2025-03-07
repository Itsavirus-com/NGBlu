'use client'

import { useTranslations } from 'next-intl'
import { Card, Container, ProgressBar } from 'react-bootstrap'
import { useWatch } from 'react-hook-form'

import { Button } from '@/components/button/button'
import { FormProvider } from '@/components/forms/form-provider/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { KTIcon } from '@/components/kt-icon/kt-icon'
import { Toast } from '@/components/toast/toast'

import useSetPasswordForm from './_hooks/set-password.hook'

export default function SetPasswordFirstTime() {
  const t = useTranslations('auth.setPassword')
  const {
    methods,
    onSubmit,
    isLoading,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    getPasswordStrength,
    getStrengthColor,
    getStrengthText,
  } = useSetPasswordForm()

  const newPassword = useWatch({
    control: methods.control,
    name: 'newPassword',
  })

  const passwordStrength = getPasswordStrength(newPassword || '')

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="w-100 px-3">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-3">Welcome to InfraOrders</h2>
          <p className="text-muted">Please set a password to activate your account</p>
        </div>

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Card>
            <Card.Header>
              <Card.Title>Create Your Password</Card.Title>
              <Card.Subtitle className="text-muted">
                This will be used to secure your account
              </Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <div className="mb-5">
                <div className="position-relative">
                  <ControlledInput
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    label="New Password"
                    isRequired
                    autoFocus
                    containerClass="mb-2"
                  />
                </div>

                {newPassword && (
                  <div className="mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fs-7">Password strength:</span>
                      <span className="fs-7 fw-bold">{getStrengthText(passwordStrength)}</span>
                    </div>
                    <ProgressBar
                      now={passwordStrength}
                      variant={getStrengthColor(passwordStrength)}
                      className="h-8px"
                    />

                    <div className="mt-4">
                      <p className="fs-7 fw-bold mb-2">Password requirements:</p>
                      <ul className="fs-7 ps-4">
                        <li className="mb-1">
                          <div className="d-flex align-items-center">
                            <KTIcon
                              iconName={newPassword.length >= 12 ? 'check' : 'cross'}
                              className={`fs-7 me-2 ${
                                newPassword.length >= 12 ? 'text-success' : 'text-danger'
                              }`}
                            />
                            <span>At least 12 characters</span>
                          </div>
                        </li>
                        <li className="mb-1">
                          <div className="d-flex align-items-center">
                            <KTIcon
                              iconName={/[A-Z]/.test(newPassword) ? 'check' : 'cross'}
                              className={`fs-7 me-2 ${
                                /[A-Z]/.test(newPassword) ? 'text-success' : 'text-danger'
                              }`}
                            />
                            <span>At least one uppercase letter</span>
                          </div>
                        </li>
                        <li className="mb-1">
                          <div className="d-flex align-items-center">
                            <KTIcon
                              iconName={/[a-z]/.test(newPassword) ? 'check' : 'cross'}
                              className={`fs-7 me-2 ${
                                /[a-z]/.test(newPassword) ? 'text-success' : 'text-danger'
                              }`}
                            />
                            <span>At least one lowercase letter</span>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center">
                            <KTIcon
                              iconName={
                                /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword)
                                  ? 'check'
                                  : 'cross'
                              }
                              className={`fs-7 me-2 ${
                                /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword)
                                  ? 'text-success'
                                  : 'text-danger'
                              }`}
                            />
                            <span>At least one number or special character</span>
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
                    type={showConfirmPassword ? 'text' : 'password'}
                    label="Confirm Password"
                    isRequired
                    containerClass="mb-2"
                  />
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button
                type="submit"
                label={isLoading ? 'Activating Account...' : 'Activate Account'}
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
