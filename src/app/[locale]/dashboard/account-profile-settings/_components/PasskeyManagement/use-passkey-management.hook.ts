import { format } from 'date-fns'
import { useEffect, useState } from 'react'

import { usePasskey } from '@/hooks/use-passkey.hook'
import { useSecurityEnforcement } from '@/hooks/use-security-enforcement.hook'

interface Passkey {
  id: number
  name: string
  registrationIpAddress: string | null
  registrationLocation: string | null
  registrationUserAgent: string | null
  lastUsedIpAddress: string | null
  lastUsedLocation: string | null
  lastUsedUserAgent: string | null
  lastUsedAt: string | null
  createdAt: string
  updatedAt: string
}

interface DeviceInfo {
  browser: string
  os: string
  icon: string
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
  const { recheckStatus } = useSecurityEnforcement()

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

  // Utility function to parse user agent and extract device info
  const parseUserAgent = (userAgent: string | null): DeviceInfo => {
    if (!userAgent) {
      return { browser: 'Unknown', os: 'Unknown', icon: 'global' }
    }

    let browser = 'Unknown'
    let os = 'Unknown'
    let icon = 'global'

    // Detect browser and set browser-specific icon
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
      browser = 'Chrome'
      icon = 'chrome'
    } else if (userAgent.includes('Firefox')) {
      browser = 'Firefox'
      icon = 'laptop'
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      browser = 'Safari'
      icon = 'apple'
    } else if (userAgent.includes('Edg')) {
      browser = 'Edge'
      icon = 'microsoft'
    }

    // Detect OS
    if (userAgent.includes('Macintosh') || userAgent.includes('Mac OS X')) {
      os = 'Mac'
    } else if (userAgent.includes('Windows')) {
      os = 'Windows'
    } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
      os = userAgent.includes('iPhone') ? 'iPhone' : 'iPad'
    } else if (userAgent.includes('Android')) {
      os = 'Android'
    } else if (userAgent.includes('Linux')) {
      os = 'Linux'
    }

    return { browser, os, icon }
  }

  // Get device icon based on device info
  const getDeviceIcon = (deviceInfo: DeviceInfo): string => {
    return deviceInfo.icon
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy, hh:mm a')
  }

  const formatCreatedInfo = (passkey: Passkey) => {
    const deviceInfo = parseUserAgent(passkey.registrationUserAgent)
    const formattedDate = formatDate(passkey.createdAt)

    let locationText = ''
    if (passkey.registrationLocation) {
      locationText = ` in ${passkey.registrationLocation}`
    }

    return `${formattedDate}, ${deviceInfo.browser} on ${deviceInfo.os}${locationText}`
  }

  const formatLastUsedInfo = (passkey: Passkey) => {
    if (!passkey.lastUsedAt) {
      return 'Never used'
    }

    const deviceInfo = parseUserAgent(passkey.lastUsedUserAgent)
    const formattedDate = formatDate(passkey.lastUsedAt)
    let locationText = ''
    if (passkey.lastUsedLocation) {
      locationText = ` in ${passkey.lastUsedLocation}`
    }

    return `${formattedDate}, ${deviceInfo.browser} on ${deviceInfo.os}${locationText}`
  }

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
      recheckStatus()
    }
  }

  const handleDeleteClick = (passkey: Passkey) => {
    setPasskeyToDelete(passkey)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (passkeyToDelete) {
      const result = await deletePasskey(passkeyToDelete.id.toString())
      if (result.success) {
        setShowDeleteModal(false)
        setPasskeyToDelete(null)
        await loadUserPasskeys() // Refresh the list

        // Only recheck security status if this was the last passkey
        if (userPasskeys.length === 1) {
          recheckStatus()
        }
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

    // Utilities
    parseUserAgent,
    getDeviceIcon,
    formatDate,
    formatCreatedInfo,
    formatLastUsedInfo,
  }
}

export type { DeviceInfo, Passkey }
