const PASSWORD_VERIFICATION_KEY = 'password_verified_session'

export interface PasswordVerification {
  sessionId: string
  verified: boolean
}

/**
 * Get current session ID from auth token or storage
 */
const getCurrentSessionId = (): string => {
  // Try to get session ID from auth token expiry (unique per login)
  const tokenExpiry = localStorage.getItem('token_expires_at')
  if (tokenExpiry) {
    return tokenExpiry
  }

  // Fallback: use current timestamp as session identifier
  const sessionStart = localStorage.getItem('session_start') || Date.now().toString()
  if (!localStorage.getItem('session_start')) {
    localStorage.setItem('session_start', sessionStart)
  }
  return sessionStart
}

/**
 * Check if password verification is valid for current session
 */
const isVerified = (): boolean => {
  if (typeof window === 'undefined') return false

  const verification = localStorage.getItem(PASSWORD_VERIFICATION_KEY)
  if (!verification) return false

  try {
    const { sessionId }: PasswordVerification = JSON.parse(verification)
    const currentSessionId = getCurrentSessionId()

    // Valid if same session
    return sessionId === currentSessionId
  } catch {
    return false
  }
}

/**
 * Set password verification for current session
 */
const setVerified = (): void => {
  if (typeof window === 'undefined') return

  const verification: PasswordVerification = {
    sessionId: getCurrentSessionId(),
    verified: true,
  }
  localStorage.setItem(PASSWORD_VERIFICATION_KEY, JSON.stringify(verification))
}

/**
 * Clear password verification
 */
const clearVerification = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(PASSWORD_VERIFICATION_KEY)
  localStorage.removeItem('session_start')
}

/**
 * Check if user needs password verification (only for non-Microsoft users)
 */
const needsVerification = (userProfile: any): boolean => {
  // Microsoft users don't have passwords, so skip verification
  if (userProfile?.authType === 'microsoft') {
    return false
  }

  // Other users need verification if not already verified
  return !isVerified()
}

export const passwordVerificationUtils = {
  isVerified,
  setVerified,
  clearVerification,
  needsVerification,
}
