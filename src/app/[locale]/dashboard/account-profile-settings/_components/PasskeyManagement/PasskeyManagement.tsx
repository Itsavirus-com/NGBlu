'use client'

import Loading from '@/components/loading/loading'

import { PasskeyEmptyState } from './PasskeyEmptyState'
import { PasskeyModals } from './PasskeyModals'
import { PasskeyNotSupported } from './PasskeyNotSupported'
import { PasskeyTable } from './PasskeyTable'
import { usePasskeyManagement } from './use-passkey-management.hook'

export const PasskeyManagement = () => {
  const {
    // State
    isSupported,
    isPlatformAuthenticatorAvailable,
    isRegistering,
    userPasskeys,
    isLoadingPasskeys,
    showDeleteModal,
    passkeyToDelete,
    showRegisterModal,
    registerPasskeyName,

    // Actions
    handleRegisterClick,
    handleRegisterPasskey,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCancelDelete,
    handleCancelRegister,
    handleRegisterPasskeyNameChange,

    // Utilities
    parseUserAgent,
    getDeviceIcon,
    formatCreatedInfo,
    formatLastUsedInfo,
  } = usePasskeyManagement()

  // Show not supported message
  if (!isSupported) {
    return <PasskeyNotSupported />
  }

  // Show loading state
  if (isLoadingPasskeys) {
    return (
      <div className="text-center py-4">
        <Loading />
      </div>
    )
  }

  // Show empty state
  if (!userPasskeys || userPasskeys.length === 0) {
    return (
      <>
        <PasskeyEmptyState
          isPlatformAuthenticatorAvailable={isPlatformAuthenticatorAvailable}
          isRegistering={isRegistering}
          onRegisterClick={handleRegisterClick}
        />

        <PasskeyModals
          showDeleteModal={showDeleteModal}
          passkeyToDelete={passkeyToDelete}
          onDeleteConfirm={handleDeleteConfirm}
          onDeleteCancel={handleCancelDelete}
          showRegisterModal={showRegisterModal}
          registerPasskeyName={registerPasskeyName}
          onRegisterConfirm={handleRegisterPasskey}
          onRegisterCancel={handleCancelRegister}
          onRegisterNameChange={handleRegisterPasskeyNameChange}
        />
      </>
    )
  }

  // Show table with passkeys
  return (
    <>
      <PasskeyTable
        passkeys={userPasskeys}
        onDelete={handleDeleteClick}
        onRegisterClick={handleRegisterClick}
        isRegistering={isRegistering}
        parseUserAgent={parseUserAgent}
        getDeviceIcon={getDeviceIcon}
        formatCreatedInfo={formatCreatedInfo}
        formatLastUsedInfo={formatLastUsedInfo}
      />

      <PasskeyModals
        showDeleteModal={showDeleteModal}
        passkeyToDelete={passkeyToDelete}
        onDeleteConfirm={handleDeleteConfirm}
        onDeleteCancel={handleCancelDelete}
        showRegisterModal={showRegisterModal}
        registerPasskeyName={registerPasskeyName}
        onRegisterConfirm={handleRegisterPasskey}
        onRegisterCancel={handleCancelRegister}
        onRegisterNameChange={handleRegisterPasskeyNameChange}
      />
    </>
  )
}
