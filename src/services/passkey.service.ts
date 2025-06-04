import {
  browserSupportsWebAuthn,
  platformAuthenticatorIsAvailable,
  startAuthentication,
  startRegistration,
} from '@simplewebauthn/browser'
import type {
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
} from '@simplewebauthn/types'

import { passkeyApi } from './api/passkey-api'

/**
 * Check if the browser supports WebAuthn
 */
export const isSupported = (): boolean => {
  return browserSupportsWebAuthn()
}

/**
 * Check if platform authenticator (like Touch ID, Face ID, Windows Hello) is available
 */
export const isPlatformAuthenticatorAvailable = async (): Promise<boolean> => {
  try {
    return await platformAuthenticatorIsAvailable()
  } catch (error) {
    console.error('Error checking platform authenticator availability:', error)
    return false
  }
}

/**
 * Register a new passkey for the current user
 */
export const registerPasskey = async (
  name: string
): Promise<{
  success: boolean
  error?: string
  credential?: RegistrationResponseJSON
}> => {
  try {
    // Check browser support
    if (!isSupported()) {
      return {
        success: false,
        error: 'Your browser does not support passkeys. Please use a modern browser.',
      }
    }

    // Get registration options from the backend
    const optionsResponse = await passkeyApi.getRegistrationOptions()

    if (!optionsResponse.ok || !optionsResponse.data) {
      return {
        success: false,
        error: 'Failed to get registration options from server.',
      }
    }

    const options = optionsResponse?.data?.data as PublicKeyCredentialCreationOptionsJSON

    // Start the registration process
    const credential = await startRegistration({ optionsJSON: options })

    // Send the credential to the backend for verification
    const verificationResponse = await passkeyApi.verifyRegistration(credential, options, name)

    if (!verificationResponse.ok) {
      return {
        success: false,
        error: 'Failed to verify passkey registration.',
      }
    }

    return {
      success: true,
      credential,
    }
  } catch (error: any) {
    console.error('Passkey registration error:', error)

    // Handle specific WebAuthn errors
    if (error.name === 'NotAllowedError') {
      return {
        success: false,
        error: 'Passkey registration was cancelled or not allowed.',
      }
    }

    if (error.name === 'NotSupportedError') {
      return {
        success: false,
        error: 'Your device does not support this type of passkey.',
      }
    }

    return {
      success: false,
      error: error.message || 'An unexpected error occurred during passkey registration.',
    }
  }
}

/**
 * Check if user has registered passkeys by examining authentication options
 */
export const hasRegisteredPasskeys = async (): Promise<{
  hasPasskeys: boolean
  error?: string
}> => {
  try {
    // Get authentication options from the backend
    const optionsResponse = await passkeyApi.loginOptions()

    if (!optionsResponse.ok || !optionsResponse.data) {
      return {
        hasPasskeys: false,
        error: 'Failed to get authentication options from server.',
      }
    }

    const options = optionsResponse.data.data as PublicKeyCredentialRequestOptionsJSON

    // Check if allowCredentials has any passkeys
    const hasPasskeys = Boolean(options.allowCredentials && options.allowCredentials.length > 0)

    return {
      hasPasskeys,
    }
  } catch (error: any) {
    return {
      hasPasskeys: false,
      error: error.message || 'Failed to check passkey availability',
    }
  }
}

/**
 * Authenticate using a passkey
 */
export const authenticateWithPasskey = async (): Promise<{
  success: boolean
  error?: string
  authData?: any
}> => {
  try {
    // Check browser support
    if (!isSupported()) {
      return {
        success: false,
        error: 'Your browser does not support passkeys. Please use a modern browser.',
      }
    }

    // Get authentication options from the backend
    const optionsResponse = await passkeyApi.loginOptions()

    if (!optionsResponse.ok || !optionsResponse.data) {
      return {
        success: false,
        error: 'Failed to get authentication options from server.',
      }
    }

    const options = optionsResponse.data.data as PublicKeyCredentialRequestOptionsJSON

    // If allowCredentials is empty, don't use useBrowserAutofill as this indicates
    // non-discoverable credentials that require user interaction
    const hasCredentials = options.allowCredentials && options.allowCredentials.length > 0
    const authOptions: any = { optionsJSON: options }

    if (hasCredentials) {
      // Use browser autofill only when we have specific credentials
      authOptions.useBrowserAutofill = true
    }

    const credential = await startAuthentication(authOptions)

    // Send the credential to the backend for verification
    const verificationResponse = await passkeyApi.verifyLogin(credential, options)

    if (!verificationResponse.ok) {
      return {
        success: false,
        error: 'Failed to verify passkey authentication.',
      }
    }

    // Extract authentication data from headers like manual login
    const headers = verificationResponse.headers as Record<string, string>
    const accessToken = headers['access-token']
    const clientPrivateKey = headers['client-private-key']
    const accessTokenExpiresAt = headers['access-token-expires-at']
    const userData = verificationResponse.data.data

    return {
      success: true,
      authData: {
        accessToken,
        accessTokenExpiresAt,
        clientPrivateKey,
        userData,
      },
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during passkey authentication.',
    }
  }
}

/**
 * Authenticate using conditional UI (browser autofill)
 */
export const authenticateWithConditionalUI = async (): Promise<{
  success: boolean
  error?: string
  authData?: any
}> => {
  try {
    // Check browser support
    if (!isSupported()) {
      return {
        success: false,
        error: 'Your browser does not support passkeys.',
      }
    }

    // Get authentication options with empty allowCredentials for conditional UI
    const optionsResponse = await passkeyApi.loginOptions()

    if (!optionsResponse.ok || !optionsResponse.data) {
      return {
        success: false,
        error: 'Failed to get authentication options from server.',
      }
    }

    const options = optionsResponse.data.data as PublicKeyCredentialRequestOptionsJSON

    // Start authentication with conditional UI
    const credential = await startAuthentication({
      optionsJSON: options,
      useBrowserAutofill: true,
    })

    // Send the credential to the backend for verification
    const verificationResponse = await passkeyApi.verifyLogin(credential, options)

    if (!verificationResponse.ok) {
      return {
        success: false,
        error: 'Failed to verify passkey authentication.',
      }
    }

    // Extract authentication data from headers like manual login
    const headers = verificationResponse.headers as Record<string, string>
    const accessToken = headers['access-token']
    const clientPrivateKey = headers['client-private-key']
    const accessTokenExpiresAt = headers['access-token-expires-at']
    const userData = verificationResponse.data.data

    return {
      success: true,
      authData: {
        accessToken,
        accessTokenExpiresAt,
        clientPrivateKey,
        userData,
      },
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during passkey authentication.',
    }
  }
}

/**
 * Get user's registered passkeys
 */
export const getUserPasskeys = async () => {
  try {
    const response = await passkeyApi.getUserPasskeys()
    return response
  } catch (error) {
    throw error
  }
}

/**
 * Delete a passkey
 */
export const deletePasskey = async (passkeyId: string) => {
  try {
    const response = await passkeyApi.deletePasskey(passkeyId)
    return response
  } catch (error: any) {
    throw error
  }
}

// For backward compatibility, you can also export as an object
export const PasskeyService = {
  isSupported,
  isPlatformAuthenticatorAvailable,
  registerPasskey,
  authenticateWithPasskey,
  authenticateWithConditionalUI,
  getUserPasskeys,
  deletePasskey,
  hasRegisteredPasskeys,
}
