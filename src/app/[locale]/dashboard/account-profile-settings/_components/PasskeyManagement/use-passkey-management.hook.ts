import { useEffect, useState } from 'react'

import { usePasskey } from '@/hooks/use-passkey.hook'

interface Passkey {
  id: string
  name: string
  createdAt: string
  lastUsed?: string
  transports?: string[]
}

export const usePasskeyManagement = () => {
  const {
    isSupported,
    isPlatformAuthenticatorAvailable,
    isRegistering,
    userPasskeys,
    isLoadingPasskeys,
    registerPasskey,
    loadUserPasskeys,
    deletePasskey,
  } = usePasskey()

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [passkeyToDelete, setPasskeyToDelete] = useState<Passkey | null>(null)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [registerPasskeyName, setRegisterPasskeyName] = useState('')

  // Load passkeys on component mount
  useEffect(() => {
    if (isSupported) {
      loadUserPasskeys()
    }
  }, [isSupported])

  const handleRegisterClick = () => {
    setRegisterPasskeyName('')
    setShowRegisterModal(true)
  }

  const handleRegisterPasskey = async () => {
    if (!registerPasskeyName.trim()) {
      return
    }

    const result = await registerPasskey(registerPasskeyName.trim())
    if (result.success) {
      setShowRegisterModal(false)
      setRegisterPasskeyName('')
      await loadUserPasskeys() // Refresh the list
    }
  }

  const handleDeleteClick = (passkey: Passkey) => {
    setPasskeyToDelete(passkey)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (passkeyToDelete) {
      const result = await deletePasskey(passkeyToDelete.id)
      if (result.success) {
        setShowDeleteModal(false)
        setPasskeyToDelete(null)
        await loadUserPasskeys() // Refresh the list
      }
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
    setPasskeyToDelete(null)
  }

  const handleCancelRegister = () => {
    setShowRegisterModal(false)
    setRegisterPasskeyName('')
  }

  const handleRegisterPasskeyNameChange = (name: string) => {
    setRegisterPasskeyName(name)
  }

  return {
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
  }
}

export type { Passkey }
