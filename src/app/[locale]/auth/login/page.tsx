'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/button/button'
import { FormProvider } from '@/components/forms/form-provider'

import { AuthOptionsStep } from './_components/AuthOptionsStep'
import { InitialStep } from './_components/InitialStep'
import { PasswordStep } from './_components/PasswordStep'
import { TotpVerificationStep } from './_components/TotpVerificationStep'
import { useLogin } from './_hooks/login.hook'
import { useTotpVerification } from './_hooks/totp-verification.hook'

export default function Login() {
  const t = useTranslations('auth.login')

  const {
    // Form state
    methods,
    emailValue,

    // Step state
    currentStep,
    userHasPasskey,
    isCheckingPasskey,

    // Loading states
    isLoading,
    isPasskeySupported,
    isPasskeyAuthenticating,

    // Step navigation
    handleEmailContinue,
    handlePasswordOption,
    handleBackToEmail,
    handleBackToOptions,
    handleBackToPassword,

    // 2FA state
    tempToken,
    userEmail,

    // Authentication actions
    onSubmit,
    handleMicrosoftSignIn,
    handlePasskeySignIn,
  } = useLogin()

  // TOTP verification hook
  const totpVerificationHook = useTotpVerification({
    tempToken,
    email: userEmail,
    onBackToPassword: handleBackToPassword,
  })

  const renderStepContent = () => {
    switch (currentStep) {
      case 'initial':
        return (
          <InitialStep
            emailValue={emailValue}
            isCheckingPasskey={isCheckingPasskey}
            onMicrosoftSignIn={handleMicrosoftSignIn}
            onEmailContinue={handleEmailContinue}
          />
        )
      case 'auth-options':
        return (
          <AuthOptionsStep
            emailValue={emailValue}
            isCheckingPasskey={isCheckingPasskey}
            isPasskeySupported={isPasskeySupported}
            userHasPasskey={userHasPasskey}
            isPasskeyAuthenticating={isPasskeyAuthenticating}
            onPasskeySignIn={handlePasskeySignIn}
            onPasswordOption={handlePasswordOption}
          />
        )
      case 'password':
        return <PasswordStep emailValue={emailValue} isLoading={isLoading} />
      case 'totp-verification':
        return (
          <TotpVerificationStep
            email={totpVerificationHook.email}
            isLoading={totpVerificationHook.isLoading}
            onBackToPassword={totpVerificationHook.onBackToPassword}
            onUseBackupCode={totpVerificationHook.handleUseBackupCode}
            useBackupCode={totpVerificationHook.useBackupCode}
            handleCodeChange={totpVerificationHook.handleCodeChange}
          />
        )
      default:
        return null
    }
  }

  // Render the appropriate form provider based on current step
  const renderContent = () => {
    if (currentStep === 'totp-verification') {
      return (
        <FormProvider
          methods={totpVerificationHook.methods}
          onSubmit={totpVerificationHook.onSubmit}
        >
          <div className="card-body py-4">
            {/* Back button for TOTP verification */}
            <div className="mb-8">
              <Button
                type="button"
                onClick={handleBackToPassword}
                icon="arrow-left"
                label="Back"
                colorClass="light"
                iconClassName="text-primary"
                className="btn-sm text-primary border-0 bg-transparent shadow-none p-0"
              />
            </div>
            {renderStepContent()}
          </div>
        </FormProvider>
      )
    }

    return (
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="card-body py-4">
          {/* Back button - Show only for auth-options and password steps */}
          {(currentStep === 'auth-options' || currentStep === 'password') && (
            <div className="mb-8">
              <Button
                type="button"
                onClick={currentStep === 'auth-options' ? handleBackToEmail : handleBackToOptions}
                icon="arrow-left"
                label="Back"
                colorClass="light"
                iconClassName="text-primary"
                className="btn-sm text-primary border-0 bg-transparent shadow-none p-0"
              />
            </div>
          )}

          {/* Header - Only show for initial step */}
          {currentStep === 'initial' && (
            <div className="text-center mb-10">
              <h1 className="text-gray-800 fs-2x fw-bolder mb-3">{t('signIn')}</h1>
              <div className="text-gray-500 fw-semibold fs-6">{t('signInToInfraOrders')}</div>
            </div>
          )}

          {/* Dynamic Content */}
          {renderStepContent()}
        </div>
      </FormProvider>
    )
  }

  return (
    <div className="d-flex flex-column flex-root" id="kt_app_root">
      <div className="d-flex flex-column flex-center flex-column-fluid">
        <div className="d-flex flex-center text-center p-10">
          <div className="card w-lg-500px bg-body rounded shadow-sm py-8 px-8 mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
