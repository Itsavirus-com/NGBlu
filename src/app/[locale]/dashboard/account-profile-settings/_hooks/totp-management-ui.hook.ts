import { useState } from 'react'

import { useTotpManagement } from './totp-management.hook'

export function useTotpManagementUI() {
  const [showQrSetup, setShowQrSetup] = useState(false)
  const [showBackupCodes, setShowBackupCodes] = useState(false)
  const [showDisableConfirm, setShowDisableConfirm] = useState(false)
  const [currentBackupCodes, setCurrentBackupCodes] = useState<string[]>([])

  const {
    is2faEnabled,
    isLoading,
    isSettingUp,
    qrCodeUrl,
    handleGenerateQrCode,
    handleDisable2fa,
  } = useTotpManagement()

  const handleStartSetup = async () => {
    await handleGenerateQrCode()
    setShowQrSetup(true)
  }

  const handleSetupComplete = (backupCodes: string[]) => {
    setCurrentBackupCodes(backupCodes)
    setShowQrSetup(false)
    setShowBackupCodes(true)
  }

  const handleDisable = () => {
    setShowDisableConfirm(true)
  }

  const handleConfirmDisable = async () => {
    setShowDisableConfirm(false)
    await handleDisable2fa()
  }

  const handleCancelDisable = () => {
    setShowDisableConfirm(false)
  }

  const handleHideQrSetup = () => {
    setShowQrSetup(false)
  }

  const handleHideBackupCodes = () => {
    setShowBackupCodes(false)
  }

  return {
    // State from useTotpManagement
    is2faEnabled,
    isLoading,
    isSettingUp,
    qrCodeUrl,

    // UI state
    showQrSetup,
    showBackupCodes,
    showDisableConfirm,
    currentBackupCodes,

    // Event handlers
    handleStartSetup,
    handleSetupComplete,
    handleDisable,
    handleConfirmDisable,
    handleCancelDisable,
    handleHideQrSetup,
    handleHideBackupCodes,
  }
}
