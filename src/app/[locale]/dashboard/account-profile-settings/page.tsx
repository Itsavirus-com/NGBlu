'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import Loading from '@/components/loading/loading'
import { Page } from '@/components/page/page'

import { PasswordForm } from './_components/password-form'
import { ProfileForm } from './_components/profile-form'
import useAccountProfileSettings from './_hooks/account-profile-settings.hook'

export default function AccountSettings() {
  const t = useTranslations('account')
  const {
    profileMethods,
    passwordMethods,
    onSubmitProfile,
    onSubmitPassword,
    isSubmittingProfile,
    isSubmittingPassword,
    isLoading,
    userProfile,
  } = useAccountProfileSettings()

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

  const tabs = [profileInfoTab, passwordUpdateTab]

  return (
    <Page title={t('accountSettings')} description={t('manageYourAccount')}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="row">
          <div className="col-lg-12">
            <DynamicTabs tabs={tabs} defaultActiveKey="profile-info" />
          </div>
        </div>
      )}
    </Page>
  )
}
