'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { ConfirmationModal } from '@/components/confirmation-modal/confirmation-modal'
import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import Loading from '@/components/loading/loading'
import { Page } from '@/components/page/page'
import { useRouter } from '@/navigation'
import { passwordVerificationUtils } from '@/utils/password-verification'

import { PasskeyManagement } from './_components/PasskeyManagement/PasskeyManagement'
import { PasswordForm } from './_components/PasswordForm'
import { ProfileForm } from './_components/ProfileForm'
import useAccountProfileSettings from './_hooks/account-profile-settings.hook'

export default function AccountSettings() {
  const t = useTranslations('account')
  const router = useRouter()
  const [isCheckingVerification, setIsCheckingVerification] = useState(true)
  const {
    profileMethods,
    passwordMethods,
    onSubmitProfile,
    onSubmitPassword,
    isSubmittingProfile,
    isSubmittingPassword,
    isLoading,
    userProfile,
    showEmailConfirmModal,
    confirmEmailChange,
    cancelEmailChange,
    emailUpdatesRemaining,
    maxEmailUpdatesPerDay,
  } = useAccountProfileSettings()

  // Check password verification status once user profile is loaded
  useEffect(() => {
    if (!isLoading && userProfile) {
      // Check if password verification is needed
      if (passwordVerificationUtils.needsVerification(userProfile)) {
        router.push('/dashboard/account-profile-settings/verify-password')
        return
      }

      setIsCheckingVerification(false)
    }
  }, [isLoading, userProfile, router])

  // Show loading until we've checked verification status
  if (isLoading || isCheckingVerification) {
    return (
      <Page title={t('accountSettings')} description={t('manageYourAccount')}>
        <Loading />
      </Page>
    )
  }

  const profileInfoTab = {
    eventKey: 'profile-info',
    title: t('profileInformation'),
    content: (
      <ProfileForm
        isSubmitting={isSubmittingProfile}
        onSubmit={onSubmitProfile}
        methods={profileMethods}
      />
    ),
  }

  const passwordUpdateTab = {
    eventKey: 'password-update',
    title: t('passwordUpdate'),
    condition: Boolean(userProfile?.authType !== 'microsoft'),
    content: (
      <PasswordForm
        isSubmitting={isSubmittingPassword}
        onSubmit={onSubmitPassword}
        methods={passwordMethods}
      />
    ),
  }

  const passkeyManagementTab = {
    eventKey: 'passkey-management',
    title: t('passkeyManagement'),
    condition: Boolean(userProfile?.authType !== 'microsoft'),
    content: <PasskeyManagement />,
  }

  const tabs = [profileInfoTab, passwordUpdateTab, passkeyManagementTab]

  return (
    <Page title={t('accountSettings')} description={t('manageYourAccount')}>
      <div className="row">
        <div className="col-lg-12">
          <DynamicTabs tabs={tabs} defaultActiveKey="profile-info" />
        </div>
      </div>

      <ConfirmationModal
        title={t('emailChangeConfirmation')}
        body={t('emailChangeLimitWarning', {
          count: emailUpdatesRemaining,
          max: maxEmailUpdatesPerDay,
        })}
        visible={showEmailConfirmModal}
        onCancel={cancelEmailChange}
        onConfirm={confirmEmailChange}
        confirmLabel={t('confirmEmailChange')}
        variant="warning"
      />
    </Page>
  )
}
